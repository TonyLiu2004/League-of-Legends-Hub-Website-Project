import { createClient } from '@supabase/supabase-js'
const URL = 'https://ewabchpldgjkqlkvobka.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3YWJjaHBsZGdqa3Fsa3ZvYmthIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1MTQzMTMsImV4cCI6MjAxNDA5MDMxM30.ogqtQzGwvkzVWLSkjhWwVahaQCMAEyXoIrrQXgeVgJg';
export const supabase = createClient(URL, API_KEY);