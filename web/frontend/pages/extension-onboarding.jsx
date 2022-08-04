import { Card, Page, Layout, TextContainer, Heading } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";

const SHORTCODES = [
  {
    id: 1,
    name: 'Youtube',
    parameters: 'src',
    example: '[youtube src="YOUTUBE_KEY"]'
  },
  {
    id: 2,
    name: 'Product',
    parameters: 'handle',
    example: '[product handle="YOUTUBE_KEY"]'
  }
]

export default function PageName() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/')
  }

  return (
    <Page>
      <TitleBar
        title="Extension Onboarding"
        secondaryActions={[
          {
            content: "Back Home",
            onAction: goHome,
          },
        ]}
      />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Heading>How to Guide</Heading>
            <TextContainer>
              <p>Now that you've installed the app, you now have access to our shortcodes, and can use them to replace existing OS2 blocks.</p>
              <p>Our extension works on any OS2 theme, and is intended to replace the "content" on Pages, Blog Posts, and Product Pages.</p>
              <p>Within Shopify, you can "hide" your normal content block, and replace it with ours.</p>
              <p>Once you do that, you can use our suite of shortocdes directly within shopify, and our extension will replace it with code. Simply pass it the relevant data</p>
              <p>We currently support {SHORTCODES.length} Shortcodes:</p>
              <ul>
                {SHORTCODES.map(code => (
                  <ul>{code.name} -- <strong>{code.example}</strong></ul>
                ))}
              </ul>
              <p>@TODO Show screenshots</p>
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
