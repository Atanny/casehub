import supabase from '../../../lib/supabase'
export default async function handler(req, res) {
  const { id } = req.query
  try {
    if (req.method === 'DELETE') {
      const { error } = await supabase.from('drafts').delete().eq('id', id)
      if (error) throw error
      return res.status(200).json({ success: true })
    }
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
