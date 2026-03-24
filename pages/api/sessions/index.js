import { createClient } from '@supabase/supabase-js';
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  const { method } = req;
  if (method === 'GET') {
    const { email, date } = req.query;
    let q = sb.from('sessions').select('*, session_cases(*), session_breaks(*)').order('time_in', { ascending: false });
    if (email) q = q.eq('email', email);
    if (date) q = q.gte('time_in', date + 'T00:00:00').lte('time_in', date + 'T23:59:59');
    const { data, error } = await q.limit(100);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }
  if (method === 'POST') {
    const { action, email, session_id, case_id, break_id, case_num, case_type, note, break_type } = req.body;
    if (action === 'time_in') {
      const { data, error } = await sb.from('sessions').insert([{ email, time_in: new Date().toISOString(), status: 'active' }]).select().single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }
    if (action === 'time_out') {
      const { data, error } = await sb.from('sessions').update({ time_out: new Date().toISOString(), status: 'completed' }).eq('id', session_id).select().single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }
    if (action === 'log_case') {
      const { data, error } = await sb.from('session_cases').insert([{ session_id, email, case_num, case_type, note, started_at: new Date().toISOString() }]).select().single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }
    if (action === 'close_case') {
      const { data, error } = await sb.from('session_cases').update({ ended_at: new Date().toISOString() }).eq('id', case_id).select().single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }
    if (action === 'log_break') {
      const { data, error } = await sb.from('session_breaks').insert([{ session_id, email, break_type, started_at: new Date().toISOString() }]).select().single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }
    if (action === 'end_break') {
      const { data, error } = await sb.from('session_breaks').update({ ended_at: new Date().toISOString() }).eq('id', break_id).select().single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }
  }
  if (method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'Missing id' });
    // Delete child records first
    await sb.from('session_cases').delete().eq('session_id', id);
    await sb.from('session_breaks').delete().eq('session_id', id);
    const { error } = await sb.from('sessions').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ deleted: true });
  }

}
