"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FloatingDoodles } from "./ui/floating-doodles"
import { DotWaveLoader } from "./dot-wave-loader"

gsap.registerPlugin(ScrollTrigger)

interface MediaItem {
  src: string
  type: "image" | "video"
  alt?: string
  aspectRatio?: "3/4" | "16/9" | "4/3" | "1/1"
}

interface MediaItemProps {
  mediaItem: MediaItem
  mediaIndex: number
  eventId: number
  eventTitle: string
  isExpanded: boolean
  totalMedia: number
  onImageClick: (eventId: number, mediaIndex: number) => void
}

function MediaItemComponent({
  mediaItem,
  mediaIndex,
  eventId,
  eventTitle,
  isExpanded,
  totalMedia,
  onImageClick,
}: MediaItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (mediaItem.type === "video" && videoRef.current) {
      if (isExpanded) {
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }
  }, [isExpanded, mediaItem.type])

  const defaultAspectRatio = mediaItem.aspectRatio || "3/4"
  const heightMap = {
    "3/4": "533px",
    "16/9": "225px",
    "4/3": "300px",
    "1/1": "400px",
  }

  return (
    <div
      key={mediaIndex}
      data-image={`${eventId}-${mediaIndex}`}
      className="relative cursor-pointer rounded-2xl overflow-hidden group shadow-xl transition-all duration-500 ease-out mx-auto"
      style={{
        height: isExpanded
          ? mediaItem.type === "video"
            ? "auto"
            : heightMap[defaultAspectRatio]
          : "80px",
        aspectRatio: isExpanded && mediaItem.type === "image" ? defaultAspectRatio : undefined,
        maxWidth: "400px",
        width: "100%",
      }}
      onClick={() => onImageClick(eventId, mediaIndex)}
    >
      {mediaItem.type === "image" ? (
        <Image
          src={mediaItem.src}
          alt={`${eventTitle} - Foto ${mediaIndex + 1}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <video
          ref={videoRef}
          src={mediaItem.src}
          className={`w-full transition-transform duration-500 group-hover:scale-105 ${
            isExpanded ? "h-auto" : "h-full object-cover"
          }`}
          controls={isExpanded}
          autoPlay={isExpanded}
          loop
          muted
          playsInline
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent pointer-events-none" />

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white pointer-events-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
              {mediaItem.type === "video" && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
              {mediaIndex + 1}/{totalMedia}
            </div>
            {!isExpanded && <span className="text-sm opacity-80">Clique para expandir</span>}
          </div>
          <div
            className="text-2xl transition-transform duration-300"
            style={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            ↓
          </div>
        </div>
      </div>

      {!isExpanded && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] pointer-events-none" />
      )}
    </div>
  )
}

interface Event {
  id: number
  date: string
  title: string
  description: string
  media: MediaItem[]
}

const events: Event[] = [
  {
    id: 1,
    date: "Dezembro 2024",
    title: "Nosso Primeiro Encontro em Fortaleza-CE",
    description:
      "Lembro que nesse dia eu tava bem ansioso pois tava com muita saudade e era a primeira vez que a gente se encontrava fora de Russas. Lembro também que passei um tempão falando que tava a fim de comer taco, e aí quando finalmente fomos comer o bendito taco, ele não superou minhas espectativas. Mas tirando isso, foi uma noite que eu me diverti bastante e fui pra casa com um sorriso no rosto.",
    media: [
      { src: "/imprensa.jpeg", type: "image", aspectRatio: "3/4" },
      { src: "/imprensa-2.jpeg", type: "image", aspectRatio: "3/4" },
      { src: "/imprensa-3.mp4", type: "video" },
    ],
  },
  {
    id: 2,
    date: "Janeiro 2025",
    title: "Inaugurando a Trevo",
    description:
      "Aprendi a gostar de açaí com você! Tudo começou quando a gente foi na Lori comprar o açaí mais pedrado de todos os tempos. Mas quando a Trevo inaugurou... pude ter certeza que o açaí da Lori não é tão bom. Nesse dia a gente tinha saído da faculdade em busca de um docinho e achamos ouro. Lembro que no dia seguinte a gente foi de novo.",
    media: [{ src: "/trevo.jpeg", type: "image", aspectRatio: "3/4" }],
  },
  {
    id: 3,
    date: "Maio 2025",
    title: "Investimos na nossa visão",
    description:
      "Muito difícil ser da TI e não usar um óculos. Você falava a todo momento que eu necessitava de um óculos. Demorei a aceitar que precisava, mas teve o exato dia que falei: 'Vamos no centro olhar uns óculos.', e acabamos comprando. E você ficou muito linda com esse modelo.",
    media: [
      { src: "/oculos-john.jpeg", type: "image", aspectRatio: "3/4" },
      { src: "/oculos-john-1.jpeg", type: "image", aspectRatio: "3/4" },
    ],
  },
  {
    id: 4,
    date: "Junho 2025",
    title: "Primeira viagem pra Canoa",
    description:
      "Lembro que eu tava planejando essa viagem há meses antes, e ainda bem que deu tudo certo. Fizemos uma viagem muito boa, comemos bem, dormimos bem e passamos um tempo muito bom. Ainda assistimos Carros 2 haha. Não podemos esquecer que foi nessa viagem que você decidiu colocar um percing. Minutos antes de colocar você tava bem indecisa, mas bastou beber uma capirinha que você decidiu fazer. Por fim, ficamos num local que a gente sabe que pode levar a Catarina na próxima vez.",
    media: [
      { src: "/canoa-1.jpg", type: "image", aspectRatio: "3/4" },
      { src: "/canoa-2.jpg", type: "image", aspectRatio: "3/4" },
      { src: "/canoa.jpg", type: "image", aspectRatio: "3/4" },
      { src: "/canoa-3.jpg", type: "image", aspectRatio: "3/4" },
    ],
  },
  {
    id: 5,
    date: "Junho 2025",
    title: "Cat: momentos sapecas",
    description:
      "De todas as fotos da Cat, essa primeira é a que eu mais dou risada porque ela ficou bem seria enquanto eu explicava como o HTML funcionava, e ela ficou tão chocada! Na segunda imagem podemos ver uma coitadinha que não pode colocar o cone no pescoço que já perde as forças e não quer fazer mais nada. Nas outras duas imagens, a cat mostra que as vezes deve-se dormir como uma ladie, mas também que às vezes pode dormir imitando a posição de um demogorgon morto. Ela veio pra alegrar ainda mais nossas vidas.",
    media: [
      { src: "/cat.jpeg", type: "image", aspectRatio: "3/4" },
      { src: "/cat-2.jpeg", type: "image", aspectRatio: "16/9" },
      { src: "/cat-3.jpeg", type: "image", aspectRatio: "3/4" },
      { src: "/cat-4.jpeg", type: "image", aspectRatio: "16/9" },
    ],
  },
  {
    id: 6,
    date: "Julho 2025",
    title: "Viagem pra Maceió",
    description:
      "A viagem foi show de bola! A ida e a volta foram cansativas, mas valeu muito a pena. Conhecemos um pouco da cidade, fomos ao CSBC e ainda aproveitamos a praia do Gunga. Quando você comentou sobre a possibilidade de apresentar no evento, pensei logo: 'eu tenho que ir junto com minha mulher!', e fui. O melhor de tudo foi te ver naquele palco, falando sobre algo que você vinha pesquisando e se dedicando há tanto tempo. Deu tudo certo, exatamente como você planejou. Você foi maravilhosa, meu amor. Fiquei muito feliz em poder estar ali, vivendo esse momento com você. Durante a viagem ainda tentamos três vezes achar um hambúrguer que realmente nos surpreendesse no Truckzone, mas não deu muito certo. Mesmo assim, alugamos um carro, saímos por aí e ainda fomos até a praia do Gunga pra dar uma voltinha de banana split.",
    media: [
      { src: "/maceio.jpeg", type: "image", aspectRatio: "3/4" },
      { src: "/maceio-1.jpg", type: "image", aspectRatio: "3/4" },
      { src: "/maceio-2.jpg", type: "image", aspectRatio: "3/4" },
      { src: "/maceio-9.jpg", type: "image", aspectRatio: "3/4" },
      { src: "/maceio-3.jpg", type: "image", aspectRatio: "3/4" },
      { src: "/maceio-4.jpg", type: "image", aspectRatio: "3/4" },
      { src: "/maceio-5.jpeg", type: "image", aspectRatio: "3/4" },
      { src: "/maceio-6.jpeg", type: "image", aspectRatio: "3/4" },
      { src: "/maceio-7.jpeg", type: "image", aspectRatio: "3/4" },
      { src: "/maceio-8.jpeg", type: "image", aspectRatio: "16/9" },
    ],
  },
  {
    id: 7,
    date: "Agosto 2025",
    title: "Voltinha de Caiaque + Noite no Vignoli",
    description:
      "Eu gosto muito da primeira foto, tanto que ela é o papel de parede da nossa conversa no zap.Bom, nesse dia foi +1 daqueles dias em que a gnt combina como vai ser o nosso dia todinho. E dessa vez não foi diferente, fomos dar uma voltinha de caiaque, e considero que a gente se saiu muito bem, pois não capotamos nenhuma vez. Depois voltamos para o apto que a gente tava e nos arrumamos para jantar a pizza que não saia da minha boca há meses: pizza capresi. Foi um jantar bem chique ao lado do meu amor. Fizemos avaliação não só da pizza, mas também da sobremesa, do atendimento e do local. Lembro que ainda tentamos dar uma voltinha de patenete elétrico, mas tava muito difícil. Foi um dia maravilhoso!",
    media: [
      { src: "/praia.jpeg", type: "image", aspectRatio: "3/4" },
      { src: "/praia-2.jpg", type: "image", aspectRatio: "3/4" },
      { src: "/vignoli.jpeg", type: "image", aspectRatio: "3/4" },
      { src: "/vignoli-1.jpg", type: "image", aspectRatio: "3/4" },
      { src: "/vignoli-2.jpg", type: "image", aspectRatio: "3/4" },
    ],
  },
  {
    id: 8,
    date: "Agosto 2025",
    title: "Conhecemos o Hentz: uma hamburgueria temática nota 9",
    description:
      "Nesse dia a gnt tava em casa fazendo várias nadas, aí eu te mandei o perfil do Hentz no instagram e falei BORAAAA! Aí você que é uma pessoa que abraça a causa, concordou na hora e logo ficamos bem animado pra ir lá. Nos seus áudios dava pra notar o quão empolgada você estava pra conhecer o hentz, e eu fico bem feliz quando te vejo animada/empolgada/entusiasmada KKKK. Chegando la, entramos bem rápido e escolhemos um canto bom que dava pra ver o local 360º. Pedimos ótimas opções de hamburguers, o maior bolo de todos os tempos e as bebidas mágicas que chegaram fumaçando. +1 noite feliz. Por fim, a hamburgueria é nota 9 porque você vive me dizendo que nada é perfeito.",
    media: [
      { src: "/hentz.jpeg", type: "image", aspectRatio: "3/4" },
      { src: "/hentz-1.jpg", type: "image", aspectRatio: "3/4" },
      { src: "/hentz-2.jpg", type: "image", aspectRatio: "16/9" },
      { src: "/hentz-3.jpeg", type: "image", aspectRatio: "3/4" },
      { src: "/hentz-4.jpeg", type: "image", aspectRatio: "3/4" },
      { src: "/hentz-5.jpeg", type: "image", aspectRatio: "3/4" },
      { src: "/hentz-6.mp4", type: "video", aspectRatio: "3/4" },
    ],
  },
  {
    id: 9,
    date: "Agosto 2025",
    title: "Bulls: quiz de sheldon",
    description:
      "Você como uma fã nº1 de Sheldon, não poderíamos faltar o quiz que tava rolando no Bulls. Há tempos a gente tava querendo conhecer esse local que a mg tanto falava. E finalmente aproveitamos a oportunidade de conhecer e participar do maior quiz de todos os tempos. Você estava lá com fogo nos olhos, almejando o primeiro lugar. Mas infelizmente tinha muito nerd naquele local, maaaas isso não aluna o fato de que você conhece bastante a série e principalmente os personagens. Nesse dia tiramos várias fotos na câmera da mg, mas essas são as que eu considero as mais especiais. E por fim não podemos esquecer que todos do bulls foram embora menos nós porque o uber tava demorando pra caralho.",
    media: [
      { src: "/bulls.jpeg", type: "image", aspectRatio: "16/9" },
      { src: "/bulls-2.jpeg", type: "image", aspectRatio: "16/9" },
    ],
  },
  {
    id: 10,
    date: "Outubro 2025",
    title: "Tech Summit",
    description:
      "Considero que a gente aproveita bastante nossa vida! Além de conhecer lugares novos, experiências novas, também marcamos presença em eventos importantes como o Tech Summit. Nesse dia vimos um pouco de tudo, e você ainda conheceu minha mãe. Foi engraçado porque as duas estavam tímidas KKKK, mas acontece. E depois do evento ainda fomos jantar no iguatemi, bem chique. A única ressalva é pra sobremesa que tava extremamente amarga. E não podemos esquecer da conta que deu mais de 400 reais e a reação de todos foi bem engraçado.",
    media: [
      { src: "/tech-summit.jpeg", type: "image", aspectRatio: "3/4" },
      { src: "/tech-summit-1.jpeg", type: "image", aspectRatio: "3/4" },
      { src: "/tech-summit-2.jpeg", type: "image", aspectRatio: "3/4" },
      { src: "/tech-summit-3.jpeg", type: "image", aspectRatio: "3/4" },
      { src: "/tech-summit-4.jpeg", type: "image", aspectRatio: "3/4" },
    ],
  },
  {
    id: 11,
    date: "Novembro 2025",
    title: "Meu aniversário",
    description:
      "Esse foi o melhor aniversário de todos os tempos! Você ficou meses bolando como seria meu aniversário, se preocupou em ter lembrancinhas pros convidados e tudo mais. Você é muito amor da minha vida! Foi um dia especial, pois juntamos muitos mundos e realidades diferentes em uma só mesa kkkkkkkk. E foi bem legal que todos ficaram bem alocados. Além disso quero destacar que gostei muito do bolo da ivoneide lanches, ela entregou tudo. E o filho dela não quis levar bolo pra casa porque tava enjoado de comer o bolo da mãe. Quero dizer que foi uma noite incrível, e não poderia ser diferente sendo que você estava do meu lado compartilhando esse momento tão importante. te amo muito.",
    media: [
      { src: "/anv.jpg", type: "image", aspectRatio: "3/4" },
      { src: "/anv-1.jpeg", type: "image", aspectRatio: "3/4" },
      { src: "/anv-2.jpeg", type: "image", aspectRatio: "3/4" },
    ],
  },
  {
    id: 12,
    date: "Dezembro 2025",
    title: "Beach Park",
    description:
      "O dia mais aguardado do ano! Finalmente descemos no surreal, o brinquedo que pometia mais de 1 minuto descendo, mas acho que é bem menos. Passamos 2h na fila, mas concluímos nosso objetivo que era descer nesse brinquedo. Não podemos deixar de falar dela, a temida, a capsula! Dessa vez a gente tava com mais coragem e conseguimos descer tranquilo kkkkk. Não fomos em todos os brinquedos mas só em ter descido no surreal e vencido a cápsula já tava bom demais. Ainda aproveitamos pra deitar um pouco nas espreguiçadeiras, comemos nosso lanche e provamos um churros mediano. O dia encerrou aí? Lógica que não! Ainda fomos ao Iguatemi, sem nenhuma pretensão, mas quando entramos na Vans... saímos da loja com dois pisantes irados e de qualidade. E por fim não pode faltar o lanchinho hehe. Como é bom compartilhar a vida com você, meu amor.",
    media: [
      { src: "/beach-park.jpeg", type: "image", aspectRatio: "3/4" },
      { src: "/beach-park-1.jpeg", type: "image", aspectRatio: "3/4" },
      { src: "/beach-park-2.jpeg", type: "image", aspectRatio: "3/4" },
      { src: "/beach-park-3.jpeg", type: "image", aspectRatio: "3/4" },
      { src: "/beach-park-4.mp4", type: "video", aspectRatio: "3/4" },
    ],
  },
]

export default function TimelineWithImages() {
  const [mounted, setMounted] = useState(false)
  const [expandedImages, setExpandedImages] = useState<Map<number, number>>(new Map())
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    setMounted(true)
    const initialExpanded = new Map<number, number>()
    events.forEach((event) => {
      if (event.media.length > 1) {
        initialExpanded.set(event.id, 0)
      }
    })
    setExpandedImages(initialExpanded)
  }, [])

  useEffect(() => {
    if (!mounted || !sectionRef.current) return

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        })
      }

      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
        })
      }

      const cards = sectionRef.current?.querySelectorAll(".timeline-card")
      cards?.forEach((card) => {
        const image = card.querySelector(".timeline-image")
        if (image) {
          gsap.from(image, {
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          })
        }

        const content = card.querySelector(".timeline-content")
        if (content) {
          gsap.from(content, {
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power2.out",
          })
        }

        const badge = card.querySelector(".timeline-badge")
        if (badge) {
          gsap.from(badge, {
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            scale: 0,
            opacity: 0,
            duration: 0.5,
            delay: 0.4,
            ease: "back.out(1.7)",
          })
        }

        const arrow = card.querySelector(".timeline-arrow")
        if (arrow) {
          const path = arrow.querySelector("path")
          if (path) {
            const length = (path as SVGPathElement).getTotalLength()
            gsap.set(path, {
              strokeDasharray: length,
              strokeDashoffset: length,
            })
            gsap.to(path, {
              scrollTrigger: {
                trigger: card,
                start: "bottom 60%",
                toggleActions: "play none none none",
              },
              strokeDashoffset: 0,
              duration: 1,
              ease: "power2.inOut",
            })
          }
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [mounted])

  const handleImageClick = (eventId: number, imageIndex: number) => {
    setExpandedImages((prev) => {
      const newMap = new Map(prev)
      const currentExpanded = newMap.get(eventId)

      if (currentExpanded === imageIndex) {
        newMap.delete(eventId)
      } else {
        newMap.set(eventId, imageIndex)
      }

      return newMap
    })
  }

  if (!mounted) return null

  return (
    <section id="timeline" ref={sectionRef} className="py-20 px-4 relative">
      <FloatingDoodles />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold text-balance mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Nossos Momentos
          </h2>
          <p
            ref={subtitleRef}
            className="text-muted-foreground text-lg md:text-xl text-pretty max-w-2xl mx-auto"
          >
            Uma jornada visual através dos nossos momentos mais especiais
          </p>
        </div>

        <div className="relative space-y-24">
          {events.map((event, index) => (
            <div key={event.id} className="relative timeline-card">
              <div
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 items-center`}
              >
                <div className="timeline-image w-full md:w-1/2 relative">
                  {event.media.length === 1 ? (
                    <div className="relative aspect-3/4 h-[500px] rounded-2xl overflow-hidden group shadow-2xl mx-auto max-w-[400px]">
                      {event.media[0].type === "image" ? (
                        <Image
                          src={event.media[0].src}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <video
                          src={event.media[0].src}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          controls
                          loop
                          muted
                          playsInline
                        />
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent pointer-events-none" />
                    </div>
                  ) : (
                    <div className="relative space-y-3">
                      {event.media.map((mediaItem, mediaIndex) => (
                        <MediaItemComponent
                          key={mediaIndex}
                          mediaItem={mediaItem}
                          mediaIndex={mediaIndex}
                          eventId={event.id}
                          eventTitle={event.title}
                          isExpanded={expandedImages.get(event.id) === mediaIndex}
                          totalMedia={event.media.length}
                          onImageClick={handleImageClick}
                        />
                      ))}
                    </div>
                  )}

                  {index < events.length - 1 && (
                    <svg
                      className="timeline-arrow absolute left-1/2 -translate-x-1/2 w-12 h-24 mt-12 opacity-30 pointer-events-none hidden md:block"
                      viewBox="0 0 48 128"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M 24 0 Q 18 30 24 60 Q 30 90 24 110 L 24 120"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="text-muted-foreground"
                      />
                      <path
                        d="M 16 112 L 24 120 L 32 112"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        className="text-muted-foreground"
                      />
                    </svg>
                  )}
                </div>
                <div className="timeline-content w-full md:w-1/2 space-y-4">
                  <div className="timeline-badge inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {event.date}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-balance">{event.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center space-y-6">
          <DotWaveLoader />
          <p className="text-sm uppercase tracking-widest text-muted-foreground/60">
            Mais momentos virão
          </p>
        </div>
      </div>
    </section>
  )
}
