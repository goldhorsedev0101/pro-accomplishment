import { supabase } from '@/lib/supabase/server';

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('category')
    .select(
      `
      id,
      name,
      icon_url,
      sub_category ( id )
    `,
    )
    .neq('name', 'Custom')
    .order('created_at', { ascending: true });

  if (error) return { data: null, error };

  const formatted = data?.map((category) => ({
    id: category.id,
    name: category.name,
    icon_url: category.icon_url,
    has_sub_categories: category.sub_category?.length > 0,
  }));

  return { data: formatted, error: null };
};

export const getSubCategories = async ({ categoryId }: { categoryId: string }) => {
  const { data, error } = await supabase
    .from('sub_category')
    .select('id, name, type, category_id, icon_url')
    .eq('category_id', categoryId)
    .neq('name', 'Custom')
    .order('name', { ascending: true });
  return { data, error };
};
