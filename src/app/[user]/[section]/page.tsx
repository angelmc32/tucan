// import prisma from '../../lib/prisma';

// export default async function feed() {
//   const feed = await prisma.post.findMany({
//     where: { published: true },
//       include: {
//         author: {
//           select: { name: true },
//         },
//       },
//   });

//   return (
//     <div>
//       <h1>Public feed</h1>
//       <div className="radiux">
//       {feed.map(item => (<div key={item.id}>{item.title}</div>))}
//       </div>
//     </div>
//   );
// }

export default function Page({ params }: { params: { user: string } }) {
    return(
        <>
        <div className="w-124 h-80 bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600 rounded-lg p-24 mt-16 ml-24 mr-24 shadow-orange-500/50 opacity-90 border-4 border-black"></div>
        <div className="h-80 w-124 border-4 mr-24 ml-24 border-black rounded-lg">
            <div className="h-52 w-52 border-4 border-black rounded-full absolute left-48 top-80 bg-gradient-to-r from-orange-600 to-orange-400"></div>
            <h1 className="ml-96 mt-8 font-bold">
                Criptostreet
            </h1>
            <button className="ml-96 mt-2 italic font-medium rounded-full p-2 pl-4 pr-4 bg-black text-white justify-center">
                La más rifada del street art
            </button>
            <div className="my-8 space-x-6 flex justify-center">
                <button className="w-40 shadow-2xl border-4 border-black rounded-full p-2 hover:shadow-lg bg-orange-500 shadow-orange-400/80 font-bold text-white">
                    Perfil
                </button>
                <button className="w-40 shadow-2xl border-4 border-black rounded-full p-2 hover:shadow-lg font-bold">
                    Actividad
                </button>
                <button className="w-40 shadow-2xl border-4 border-black rounded-full p-2 hover:shadow-lg font-bold">
                    Atestaciones
                </button>
                <button className="w-40 shadow-2xl border-4 border-black rounded-full p-2 hover:shadow-lg font-bold">
                    Comunidades
                </button>
            </div>
        </div>
        </>
    );
}