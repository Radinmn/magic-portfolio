import { Row, IconButton, Text } from "@once-ui-system/core";
import { person, social } from "@/resources";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Row
      as="footer"
      fillWidth
      paddingY="24"
      horizontal="center"
      s={{ direction: "column" }}
    >
      <Row
        className={styles.mobile}
        maxWidth="m"
        fillWidth
        paddingX="16"
        paddingY="12"
        gap="20"
        horizontal="between"
        vertical="center"
        s={{
          direction: "column",
          horizontal: "center",
          align: "center",
        }}
      >
        <Text variant="body-default-s" onBackground="neutral-weak">
          © {currentYear} {person.name}
        </Text>

<Row
  gap="20"
  vertical="center"
  horizontal="center"
  style={{ transform: "scale(2)", transformOrigin: "center" }}
>          {social.map(
            (item) =>
              item.link && (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  size="m"
                  variant="ghost"
                />
              ),
          )}
        </Row>
      </Row>
    </Row>
  );
};