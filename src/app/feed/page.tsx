import prisma from '../../lib/prisma';

export default async function feed() {
  const feed = await prisma.post.findMany({
    where: { published: true },
      include: {
        author: {
          select: { name: true },
        },
      },
  });

  return (
    <div>
      <h1>Public feed</h1>
      <div className="radiux">
      {feed.map(item => (<div key={item.id}>{item.title}</div>))}
      </div>
    </div>
  );
}