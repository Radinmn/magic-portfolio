import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Schema,
  Meta,
} from "@once-ui-system/core";
import { home, about, person, baseURL } from "@/resources";
import { Projects } from "@/components/work/Projects";

// Future use
// import { Mailchimp } from "@/components";
// import { Posts } from "@/components/blog/Posts";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column maxWidth="l" gap="56" paddingY="24" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* HERO */}
      <Column fillWidth horizontal="center" gap="24" paddingTop="32">
        <Column maxWidth="s" horizontal="center" align="center">
          <RevealFx translateY="4" paddingBottom="12">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>

          <RevealFx translateY="8" delay={0.15} paddingBottom="48">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>

          <RevealFx delay={0.3}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                {about.avatar.display && (
                  <div
                    style={{
                      borderRadius: "999px",
                      boxShadow: "0 0 30px rgba(255, 255, 255, 0.12)",
                    }}
                  >
                    <Avatar
                      src={person.avatar}
                      size="xl"
                      style={{ width: "210px", height: "210px" }}
                    />{" "}
                  </div>
                )}

                <div
                  style={{
                    borderRadius: "999px",
                    boxShadow: "0 0 24px rgba(59, 130, 246, 0.28)",
                  }}
                >
                  <Button href={about.path} variant="secondary" size="l" arrowIcon>
                    More About Me
                  </Button>
                </div>
              </div>
            </div>
          </RevealFx>
        </Column>
      </Column>

      {/* FEATURED PROJECTS */}
      <Column fillWidth gap="24">
        <RevealFx translateY="12" delay={0.45}>
          <Column gap="12">
            <Text
              variant="label-default-s"
              onBackground="brand-medium"
              style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              Featured Projects
            </Text>

            <Heading as="h2" variant="display-strong-s">
              Selected work across VR, web, and interactive media
            </Heading>
          </Column>
        </RevealFx>

        <RevealFx translateY="16" delay={0.55}>
          <Projects range={[1, 3]} compact />
        </RevealFx>

        <RevealFx translateY="16" delay={0.65}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: "16px",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "520px",
                borderRadius: "1909px",

                background: "rgba(48, 118, 197, 0.08)", // brighter
                border: "1px solid rgba(88, 166, 255, 0.35)", // stronger edge
                boxShadow: "0 0 32px rgba(59, 131, 246, 0.45)", // more glow
              }}
            >
              <Button
                href="/work"
                variant="secondary"
                size="l"
                fillWidth
                style={{
                  minHeight: "60px",
                  fontSize: "1.05rem",
                  fontWeight: 500,
                  border: "none",
                  boxShadow: "none",
                }}
              >
                See Full Projects
              </Button>
            </div>
          </div>
        </RevealFx>
      </Column>

      {/* FUTURE: BLOG */}
      {/*
      <Column>
        <Posts range={[1, 2]} />
      </Column>
      */}

      {/* FUTURE: NEWSLETTER */}
      {/*
      <Mailchimp />
      */}
    </Column>
  );
}
