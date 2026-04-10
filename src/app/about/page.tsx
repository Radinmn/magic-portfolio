import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Schema,
  Row,
} from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

const getProjectPageHref = (role: string) => {
  const normalized = role.toLowerCase();

  if (normalized.includes("tweed grow to win")) return "/work/tweed-grow-to-win";
  if (normalized.includes("duck hunt vr")) return "/work/duck-hunt-vr";
  if (normalized.includes("harmonichue")) return "/work/harmonichue";
  if (normalized.includes("mutate")) return "/work/mutate";

  return "";
};

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ];

  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          s={{ hide: true }}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}

      <Row fillWidth s={{ direction: "column" }} horizontal="center" gap="32">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            top="64"
            fitHeight
            position="sticky"
            s={{ position: "relative", style: { top: "auto" } }}
            xs={{ style: { top: "auto" } }}
style={{ minWidth: "180px" }}            paddingX="l"
            paddingBottom="xl"
            gap="16"
            flex={3}
            horizontal="center"
          >
<Avatar
  src={person.avatar}
  size="xl"
  style={{ width: "225px", height: "225px" }}
/>
            <Row gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              <Text variant="body-default-s">Toronto, Canada</Text>
            </Row>

            {person.languages && person.languages.length > 0 && (
              <Row wrap gap="8" horizontal="center">
                {person.languages.map((language) => (
                  <Tag
                    key={language}
                    size="m"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {language}
                  </Tag>
                ))}
              </Row>
            )}
          </Column>
        )}

        <Column className={styles.blockAlign} flex={9} maxWidth={40} gap="32">
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="8"
            style={{
              paddingBottom: "20px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {about.calendar.display && (
              <Row
                fitWidth
                border="brand-alpha-medium"
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="8"
                marginBottom="m"
                vertical="center"
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                }}
              >
                <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                <Row paddingX="8">Schedule a call</Row>
                <IconButton
                  href={about.calendar.link}
                  data-border="rounded"
                  variant="secondary"
                  icon="chevronRight"
                />
              </Row>
            )}

            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>

            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>

            {social.length > 0 && (
              <Row
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
              >
                {social
                  .filter((item) => item.essential)
                  .map(
                    (item) =>
                      item.link && (
                        <React.Fragment key={item.name}>
                          <Row s={{ hide: true }}>
                            <Button
                              key={item.name}
                              href={item.link}
                              prefixIcon={item.icon}
                              label={item.name}
                              size="l"
                              weight="default"
                              variant="secondary"
                            />
                          </Row>
                          <Row hide s={{ hide: false }}>
                            <IconButton
                              size="l"
                              key={`${item.name}-icon`}
                              href={item.link}
                              icon={item.icon}
                              variant="secondary"
                            />
                          </Row>
                        </React.Fragment>
                      ),
                  )}
              </Row>
            )}
          </Column>

          {about.intro.display && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="8">
              <Text
                variant="body-default-l"
                style={{
                  lineHeight: 1.8,
                  padding: "18px 20px",
                  borderRadius: "18px",
                  background: "rgba(88,166,255,0.05)",
                  border: "1px solid rgba(88,166,255,0.12)",
                }}
              >
                {about.intro.description}
              </Text>
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                {about.work.title}
              </Heading>

              <Column fillWidth gap="20" marginBottom="40">
                {about.work.experiences.map((experience, index) => {
                  const projectPageHref = getProjectPageHref(experience.role);

                  return (
                    <Column
                      key={`${experience.company}-${experience.role}-${index}`}
                      fillWidth
                      gap="16"
                      style={{
                        padding: "22px",
                        borderRadius: "20px",
                        background: "rgba(255,255,255,0.025)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <Row
                        fillWidth
                        horizontal="between"
                        vertical="start"
                        s={{ direction: "column" }}
                        gap="8"
                      >
                        <Column gap="4">
                          <Text variant="heading-strong-l">{experience.role}</Text>
                          <Text variant="body-default-s" onBackground="neutral-weak">
                            {experience.company}
                          </Text>
                        </Column>

                        <Text variant="heading-default-xs" onBackground="neutral-weak">
                          {experience.timeframe}
                        </Text>
                      </Row>

                      <Column
                        as="ul"
                        gap="m"
                        style={{
                          paddingLeft: "18px",
                          margin: 0,
                        }}
                      >
                        {experience.achievements.map(
                          (achievement: React.ReactNode, achievementIndex: number) => (
                            <Text
                              as="li"
                              variant="body-default-m"
                              key={`${experience.company}-${achievementIndex}`}
                              style={{ lineHeight: 1.7 }}
                            >
                              {achievement}
                            </Text>
                          ),
                        )}
                      </Column>

                      {(projectPageHref || experience.link) && (
                        <Row gap="0" wrap paddingTop="4">
                          {projectPageHref && (
                            <Button href={projectPageHref} variant="secondary" size="s">
                              View Full Project
                            </Button>
                          )}

                          {experience.link && (
                            <Button
                              href={experience.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              variant="secondary"
                              size="s"
                            >
                              <Row gap="8" vertical="center">
                                <Text>Play Live</Text>
                                <Text style={{ fontSize: "13px" }}>↗</Text>
                              </Row>
                            </Button>
                          )}
                        </Row>
                      )}

                      {experience.images && experience.images.length > 0 && (
                        <Row fillWidth paddingTop="8" gap="12" wrap>
                          {experience.images.map((image, imageIndex) => (
                            <Row
                              key={`${experience.company}-image-${imageIndex}`}
                              radius="m"
                              style={{
                                overflow: "hidden",
                                border: "1px solid rgba(255,255,255,0.08)",
                                background: "rgba(255,255,255,0.02)",
                              }}
                            >
                              <Media
                                enlarge
                                radius="m"
                                sizes={image.width.toString()}
                                alt={image.alt}
                                src={image.src}
                              />
                            </Row>
                          ))}
                        </Row>
                      )}
                    </Column>
                  );
                })}
              </Column>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                {about.studies.title}
              </Heading>

              <Column fillWidth gap="16" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <Column
                    key={`${institution.name}-${index}`}
                    fillWidth
                    gap="0"
                    style={{
                      padding: "18px 20px",
                      borderRadius: "18px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <Text id={institution.name} variant="heading-strong-l">
                      {institution.name}
                    </Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {institution.description}
                    </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.technical.display && (
            <>
              <Heading
                as="h2"
                id={about.technical.title}
                variant="display-strong-s"
                marginBottom="20"
              >
                {about.technical.title}
              </Heading>

              <Row fillWidth wrap gap="16">
                {about.technical.skills.map((skill, index) => (
                  <Column
                    key={`${skill.title}-${index}`}
                    gap="s"
                    style={{
                      flex: "1 1 280px",
                      padding: "18px 20px",
                      borderRadius: "18px",
                      background:
                        index % 2 === 0
                          ? "rgba(255,255,255,0.025)"
                          : "rgba(88,166,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <Text id={skill.title} variant="heading-strong-l">
                      {skill.title}
                    </Text>

                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {skill.description}
                    </Text>

                    {skill.tags && skill.tags.length > 0 && (
                      <Row wrap gap="8" paddingTop="l">
                        {skill.tags.map((tag, tagIndex) => (
                          <Tag
                            key={`${skill.title}-${tagIndex}`}
                            size="m"
                            prefixIcon={tag.icon}
                            style={{
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }}
                          >
                            {tag.name}
                          </Tag>
                        ))}
                      </Row>
                    )}

                    {skill.images && skill.images.length > 0 && (
                      <Row fillWidth paddingTop="m" gap="12" wrap>
                        {skill.images.map((image, imageIndex) => (
                          <Row
                            key={`${skill.title}-image-${imageIndex}`}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Row>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
              </Row>
            </>
          )}
        </Column>
      </Row>
    </Column>
  );
}