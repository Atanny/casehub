import supabase from '../../../lib/supabase'
export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { email } = req.query
      if (!email) return res.status(400).json({ error: 'email required' })
      const { data, error } = await supabase.from('drafts').select('*').eq('user_email', email).order('saved_at', { ascending: false })
      if (error) throw error
      return res.status(200).json(data.map(r => ({ ...r.draft_data, _id: r.id, _mode: r.mode, draftAt: new Date(r.saved_at).toLocaleString() })))
    }
    if (req.method === 'POST') {
      const { userEmail, mode, draftData } = req.body
      if (!userEmail || !mode) return res.status(400).json({ error: 'userEmail and mode required' })
      const { data, error } = await supabase.from('drafts')
        .upsert([{ user_email: userEmail, mode, draft_data: draftData, saved_at: new Date().toISOString() }], { onConflict: 'user_email,mode' })
        .select().single()
      if (error) throw error
      return res.status(200).json({ ...data.draft_data, _id: data.id, _mode: data.mode, draftAt: new Date(data.saved_at).toLocaleString() })
    }
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
