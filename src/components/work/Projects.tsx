import { getPosts } from "@/utils/utils";
import { Column, Row } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  compact?: boolean;
}

export function Projects({ range, exclude, compact = false }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  if (compact) {
    return (
      <Row fillWidth wrap gap="l">
        {displayedProjects.map((post, index) => (
          <Row
            key={post.slug}
            style={{
              flex: "1 1 calc(33.333% - 16px)",
              maxWidth: "calc(33.333% - 27px)",
              minWidth: "260px",
            }}
            m={{
              style: {
                flex: "1 1 calc(50% - 12px)",
                maxWidth: "calc(50% - 12px)",
              },
            }}
            s={{
              style: {
                flex: "1 1 100%",
                maxWidth: "100%",
              },
            }}
          >
            <ProjectCard
              priority={index < 2}
              images={post.metadata.images}
              title={post.metadata.title}
              description={post.metadata.summary}
              content={post.content}
              avatars={[]}
              link={post.metadata.link || ""}
              playLink={post.metadata.link || ""}
              postTags={post.metadata.tags || []}
              compact
            />
          </Row>
        ))}
      </Row>
    );
  }

  return (
    <Column fillWidth gap="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          key={post.slug}
          priority={index < 2}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={[]}
          link={post.metadata.link || ""}
          playLink={post.metadata.link || ""}
          postTags={post.metadata.tags || []}
        />
      ))}
    </Column>
  );
}
