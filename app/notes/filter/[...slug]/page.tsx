
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type SlugProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: SlugProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];

  return {
    title: `${tag} notes`,
    description: `Notes filtered by tag "${tag}"`,
    openGraph: {
      title: `${tag} notes`,
      description: `Notes filtered by tag "${tag}"`,
      url: `http://localhost:3000/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub - Smart note organization",
        },
      ],
      type:"website",
    },
  };
}

const NotesPage = async ({ params }: SlugProps) => {
  const queryClient = new QueryClient();
  const { slug } = await params;

  const tag = slug[0] === "all" ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient slug={slug} />
    </HydrationBoundary>
  );
};

export default NotesPage;
