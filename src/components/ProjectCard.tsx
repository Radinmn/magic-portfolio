"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
} from "@once-ui-system/core";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  postTags?: string[];
  compact?: boolean;
}

const cleanInlineText = (text: string) => {
  return text
    .replace(/[#_*`>\[\]]/g, "")
    .replace(/\((.*?)\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
};

const extractSection = (content: string, heading: string) => {
  const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(
    `##\\s+${escapedHeading}\\s*([\\s\\S]*?)(?=\\n##\\s+|$)`,
    "i"
  );

  const match = content.match(regex);
  return match ? match[1].trim() : "";
};

const getOverview = (content: string) => {
  const section = extractSection(content, "Overview");
  return cleanInlineText(section);
};

const getWhyItStandsOut = (content: string) => {
  const section = extractSection(content, "Why it stands out");
  return cleanInlineText(section);
};

const getWorkPoints = (content: string) => {
  const section = extractSection(content, "What I worked on");
  if (!section) return [];

  return section
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("-"))
    .map((line) => cleanInlineText(line.replace(/^-+\s*/, "")))
    .filter(Boolean)
    .slice(0, 4);
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  postTags = [],
  compact = false,
}) => {
  const hasImages = images.length > 0;
  const overview = compact ? "" : getOverview(content);
  const whyItStandsOut = compact ? "" : getWhyItStandsOut(content);
  const workPoints = compact ? [] : getWorkPoints(content);

  const hasMeta =
    avatars?.length > 0 ||
    description?.trim() ||
    overview ||
    whyItStandsOut ||
    workPoints.length > 0 ||
    link ||
    postTags.length > 0;

  return (
    <Column
      fillWidth
      gap="l"
      paddingY="48"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {hasImages && (
        <Column
          fillWidth
          style={{
            overflow: "hidden",
            borderRadius: "20px",
          }}
        >
          <Carousel
            sizes="(max-width: 960px) 100vw, 960px"
            items={images.map((image) => ({
              slide: image,
              alt: title,
            }))}
          />
        </Column>
      )}

      <Flex
        fillWidth
        gap="88"
        s={{ direction: "column" }}
        m={{ direction: "row" }}
        style={{ alignItems: "flex-start" }}
      >
        {/* LEFT */}
        <Column gap="16" style={{ flex: 1, minWidth: 0 }}>
          <Heading
            as="h2"
            wrap="balance"
            variant="display-strong-l"
            style={{
              fontSize: compact ? "2.05rem" : "2.4rem",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            {title}
          </Heading>

          {postTags.length > 0 && (
            <Flex gap="8" wrap>
              {postTags.map((tag) => (
                <Text
                  key={tag}
                  variant="body-default-xs"
                  onBackground="neutral-strong"
                  style={{
                    padding: "7px 13px",
                    borderRadius: "999px",
                    background: "rgba(120, 170, 255, 0.12)",
                    border: "1px solid rgba(120, 170, 255, 0.2)",
                  }}
                >
                  {tag}
                </Text>
              ))}
            </Flex>
          )}
        </Column>

        {/* RIGHT */}
        {hasMeta && (
          <Column gap="20" style={{ flex: 1.45, minWidth: 0 }}>
            {!compact && avatars?.length > 0 && (
              <AvatarGroup avatars={avatars} size="m" reverse />
            )}

            {description?.trim() && (
              <Text
                wrap="pretty"
                variant={compact ? "body-default-l" : "body-default-m"}
                onBackground="neutral-weak"
                style={{ lineHeight: 1.7, margin: 0 }}
              >
                {description}
              </Text>
            )}

            {/* OVERVIEW */}
            {overview && (
              <Column
                gap="8"
                style={{
                  padding: "14px 16px",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Text
                  variant="body-default-xs"
                  style={{
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(120, 170, 255, 0.9)",
                  }}
                >
                  Overview
                </Text>

                <Text
                  wrap="pretty"
                  variant="body-default-s"
                  onBackground="neutral-strong"
                  style={{ lineHeight: 1.75, margin: 0 }}
                >
                  {overview}
                </Text>
              </Column>
            )}

            {/* WORK */}
            {workPoints.length > 0 && (
              <Column
                gap="10"
                style={{
                  padding: "14px 16px",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Text
                  variant="body-default-xs"
                  style={{
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(120, 170, 255, 0.9)",
                  }}
                >
                  What I worked on
                </Text>

                <Column gap="10">
                  {workPoints.map((point, i) => (
                    <Flex key={i} gap="10">
                      <Text
                        variant="body-default-s"
                        style={{ color: "rgba(120, 170, 255, 0.9)" }}
                      >
                        ✦
                      </Text>

                      <Text
                        wrap="pretty"
                        variant="body-default-s"
                        onBackground="neutral-strong"
                        style={{ lineHeight: 1.7 }}
                      >
                        {point}
                      </Text>
                    </Flex>
                  ))}
                </Column>
              </Column>
            )}

            {/* WHY */}
            {whyItStandsOut && (
              <Column
                gap="8"
                style={{
                  padding: "14px 16px",
                  borderRadius: "16px",
                  background: "rgba(88, 166, 255, 0.08)",
                  border: "1px solid rgba(88, 166, 255, 0.2)",
                }}
              >
                <Text
                  variant="body-default-xs"
                  style={{
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(120, 170, 255, 0.9)",
                  }}
                >
                  Why it stands out
                </Text>

                <Text
                  wrap="pretty"
                  variant="body-default-s"
                  onBackground="neutral-strong"
                  style={{ lineHeight: 1.75, margin: 0 }}
                >
                  {whyItStandsOut}
                </Text>
              </Column>
            )}

            <Flex gap="24" wrap>
              {link && (
                <SmartLink href={link} suffixIcon="arrowUpRightFromSquare">
                  <Text variant="body-default-m">View project</Text>
                </SmartLink>
              )}
            </Flex>
          </Column>
        )}
      </Flex>
    </Column>
  );
};