import { Play } from "lucide-react";

const videos = [
  {
    title: "Filtro dos sonhos x Cristão",
    thumbnail: "https://img.youtube.com/vi/w8YmmdxIvUo/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=w8YmmdxIvUo",
  },
  {
    title: "Livre-se do espírito da inveja",
    thumbnail: "https://i.ytimg.com/vi/SO6KpBVPSU0/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=SO6KpBVPSU0&t=10s",
  },
  {
    title: "Mantenha o Alvo",
    thumbnail: "https://i.ytimg.com/vi/WjhUk8X3FCQ/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=WjhUk8X3FCQ",
  },
  {
    title: "Oração da Noite",
    thumbnail: "https://i.ytimg.com/vi/6EkAor4OPgk/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=6EkAor4OPgk",
  },
];

const VideosSection = () => {
  return (
    <section id="videos" className="relative py-24 md:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      
      {/* GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300">
            <span className="text-sm font-medium">CONTEÚDO GRATUITO</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Acompanhe no <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">YouTube</span>
          </h2>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Ministrações, ensinamentos práticos e conteúdo exclusivo para sua transformação espiritual
          </p>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {videos.map((v, i) => (
            <a
              key={i}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 bg-slate-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-2">

                {/* THUMBNAIL */}
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-500/30 rounded-full blur-2xl animate-pulse" />
                      <div className="relative w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-xl">
                        <Play size={28} className="text-white ml-1" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* INFO */}
                <div className="p-4">
                  <h3 className="font-semibold text-white group-hover:text-red-400 transition-colors line-clamp-2">
                    {v.title}
                  </h3>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="https://www.youtube.com/@pr.alexandremeneghiniramos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-red-500/30"
          >
            Ver mais no YouTube
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideosSection;
