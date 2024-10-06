import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://prybqmkvtexbzomjucir.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByeWJxbWt2dGV4YnpvbWp1Y2lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg1Mjc0NjYsImV4cCI6MTk5NDEwMzQ2Nn0.VdErDUPOvmeXXYGLzHR4ufIRSDSXfJBo_AJoRzuhV_w";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
