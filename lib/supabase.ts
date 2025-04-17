import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://htjkjokoyktnofriufli.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0amtqb2tveWt0bm9mcml1ZmxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NDg5NzMsImV4cCI6MjA1OTIyNDk3M30.A9sIVw4JDfMYaHtGpxB9HRKOx3QIBnnAM4lX43jA0KM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 