import { supabase } from '@/lib/supabase/server';

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('category')
    .select('id, name, icon_url')
    .order('created_at', { ascending: true });
  return { data, error };
};

export const getSubCategories = async ({ categoryId }: { categoryId: string }) => {
  const { data, error } = await supabase
    .from('sub_category')
    .select('id, name, type, category_id, icon_url')
    .eq('category_id', categoryId)
    .order('name', { ascending: true });
  return { data, error };
};
