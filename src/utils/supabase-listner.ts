import { supabase } from '@/lib/supabase/client';

export function listenToIsFolioAvailable(id: string, cb: (newVal: any) => void) {
  const channel = supabase
    .channel(`row-changes-folio-${id}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'folio',
        filter: `id=eq.${id}`,
      },
      (payload) => {
        if (payload.eventType === 'UPDATE') {
          cb((payload.new as any)['pdf_url']);
        }
      },
    )
    .subscribe();

  return channel;
}
