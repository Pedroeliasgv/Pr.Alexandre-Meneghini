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
    <section
      id="videos"
      className="py-28 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-4">

        {/* HEAD */}
        <div className="text-center mb-20">
          <p className="text-primary tracking-[0.35em] text-xs mb-4 uppercase animate-fade-up">
            Ministrações
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white animate-fade-up delay-100">
            Acompanhe no YouTube
          </h2>

          <div className="w-24 h-[2px] bg-blue-500 mx-auto mt-6 animate-fade-up delay-200" />
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">

          {videos.map((v, i) => (
            <a
              key={i}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="
                relative rounded-2xl overflow-hidden
                border border-primary/10 bg-card

                transition-all duration-300
                hover:-translate-y-3
                hover:shadow-[0_20px_60px_rgba(59,130,246,0.35)]
              ">

                {/* THUMB */}
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  loading="lazy"
                  className="
                    w-full aspect-video object-cover

                    transition-transform duration-500
                    group-hover:scale-110
                  "
                />

                {/* OVERLAY */}
                <div className="
                  absolute inset-0 bg-black/60
                  opacity-0 group-hover:opacity-100
                  transition flex items-center justify-center
                ">

                  <div className="relative flex items-center justify-center">

                    {/* glow maior */}
                    <div className="absolute w-20 h-20 bg-blue-500/30 rounded-full blur-2xl animate-pulse" />

                    {/* botão maior */}
                    <div className="relative w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-xl">
                      <Play size={26} className="text-white ml-1" />
                    </div>

                  </div>

                </div>
              </div>

              {/* TÍTULO */}
              <p className="
                mt-4 text-base text-white/80 font-medium leading-snug
                group-hover:text-blue-400 transition
              ">
                {v.title}
              </p>
            </a>
          ))}

        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="https://www.youtube.com/@pr.alexandremeneghiniramos/featured"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-block bg-blue-500 hover:bg-blue-600
              text-white px-10 py-4 rounded-lg text-lg font-bold

              transition-all duration-300
              hover:scale-105

              shadow-[0_10px_30px_rgba(59,130,246,0.35)]
              animate-cta
            "
          >
            VER TODOS OS VÍDEOS
          </a>
        </div>

      </div>

      {/* glow mais largo */}
      <div className="
        absolute top-1/2 left-1/2
        w-[600px] h-[300px]
        bg-blue-500/10 blur-[140px]
        -translate-x-1/2 -translate-y-1/2
        pointer-events-none
      " />
    </section>
  );
};

export default VideosSection;