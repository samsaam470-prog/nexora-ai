import Link from "next/link";

type Props = {
  title: string;
  description: string;
  link: string;
};

export default function ToolCard({
  title,
  description,
  link,
}: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white">

      <h3 className="text-xl font-bold">
        {title}
      </h3>


      <p className="mt-2 text-gray-400">
        {description}
      </p>


      {link === "#" ? (
        <button
          className="mt-5 rounded-lg bg-gray-700 px-4 py-2"
        >
          Coming Soon
        </button>
      ) : (
        <Link
          href={link}
          className="mt-5 inline-block rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700"
        >
          Open Tool
        </Link>
      )}

    </div>
  );
}