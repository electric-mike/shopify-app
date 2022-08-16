import { Badge, Card, Page, Layout, TextContainer, Heading, MediaCard } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { beforeImage, afterImage } from "../assets";

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
    example: '[product handle="PRODUCT_HANDLE"]'
  },
  {
    id: 3,
    name: 'Product + Add To Cart',
    parameters: 'handle',
    example: '[product-atc handle="PRODUCT_HANDLE"]'
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
        primaryAction={{
          content: "Contact Us",
          url: 'https://electriceye.io/page/contact/'
        }}
        secondaryActions={[
          {
            content: "Back Home",
            onAction: goHome,
          },
        ]}
      />
      <Layout>
        <Layout.Section twoThirds>
          <Card sectioned>
            <Heading element="h1">Onboarding Guide</Heading>
            <br />
            <TextContainer>
              <p>Now that you've installed the app, you have access to our Shortcodes app section, and can use them to replace existing OS2 blocks.</p>
              <p>Our extension works on any OS2 theme, and is intended to replace the "content" on Blog Posts and Product Pages.</p>
              <Badge progress="incomplete" status="warning">Pages are still a work in progress!</Badge>
              <p>Within Shopify's Customize view, you can <strong>hide</strong> your normal content block, and <strong>replace</strong> it with ours.</p>
              <p>
                Once you do that, you can use our suite of shortocdes directly within Shopify's Content Editor, and our extension will replace it with code. 
                Simply pass it the relevant data, and it will populate accordingly.
              </p>
            </TextContainer>
          </Card>
        </Layout.Section>
        <Layout.Section oneThird>
          <Card sectioned>
            <Heading element="h1">Shortcode Support</Heading>
            <br />
            <TextContainer>
              <p>We currently support {SHORTCODES.length} Shortcodes:</p>
              {SHORTCODES.map(code => (
                <Card sectioned>
                  <p>{code.name}</p>
                  <p><strong>{code.example}</strong></p>
                </Card>
              ))}
            </TextContainer>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <MediaCard
            title="Before Shortcodes"
            description="Find the content section in your theme, and add our shortcodes section"
            portrait="true"
            sectioned
          >
            <img
              alt=""
              width="100%"
              height="100%"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              src={beforeImage}
            />
          </MediaCard>
        </Layout.Section>
        <Layout.Section oneHalf>
          <MediaCard
            title="After Shortcodes"
            description="Hide the old section, and voila! You have working shortcodes!"
            portrait="true"
          >
            <img
              alt=""
              width="100%"
              height="100%"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              src={afterImage}
            />
          </MediaCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
