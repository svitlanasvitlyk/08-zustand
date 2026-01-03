import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import css from './NotesPage.module.css';
import AppClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

type AppProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function App({ params }: AppProps) {
  const { slug } = await params;

  const tag = slug[0].toLowerCase() === 'all' ? undefined : slug[0];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', { query: '', page: 1, tag }],
    queryFn: () => fetchNotes('', 1, tag),
  });

  return (
    <div className={css.app}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AppClient tag={tag} />
      </HydrationBoundary>
    </div>
  );
}