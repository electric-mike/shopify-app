import {
  Avatar,
  Badge,
  Card,
  Layout,
  Page,
  ResourceList,
  ResourceItem,
  TextContainer,
  TextStyle,
  Image,
  Stack,
  Heading,
} from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { trophyImage, ElectricEyeLogo } from "../assets";

const SHORTCODES = [
  {
    id: 1,
    initials: 'YT',
    name: 'Youtube',
    parameters: 'src',
    example: '[youtube src="YOUTUBE_KEY"]'
  },
  {
    id: 2,
    initials: 'PV',
    name: 'Product + View Product',
    parameters: 'handle',
    example: '[product handle="PRODUCT_HANDLE"]'
  },
  {
    id: 3,
    initials: 'PA',
    name: 'Product + Add To Cart',
    parameters: 'handle',
    example: '[product-atc handle="PRODUCT_HANDLE"]'
  }
]

export default function HomePage() {
  const navigate = useNavigate();

  const viewOnboarding = () => {
    navigate('/extension-onboarding');
  }

  const viewSupport = () => {
    navigate('/extension-support');
  }

  return (
    <Page>
      <TitleBar 
        title="Welcome"
        primaryAction={{
          content: "Onboarding",
          onAction: viewOnboarding,
        }}
        secondaryActions={[
          {
            content: "Support",
            onAction: viewSupport,
          }
        ]}
      />
      <Layout>
        <Layout.Section>
          <Card 
            sectioned
            primaryFooterAction={{
              content: "Read Onboarding Guide",
              onAction: viewOnboarding
            }}
            secondaryFooterActions={[
              {
                content: "View Support Page",
                onAction: viewSupport
              }
            ]}
          >
            <Stack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <Stack.Item fill>
                <TextContainer spacing="loose">
                  <Heading>Thanks for installing Electric Shortcodes! ⚡</Heading>
                  <p>Now that you've installed the app, you have access to our shortcodes, and can use them to replace existing OS2-based theme blocks.</p>
                  <p>To get started, view our onboarding guide!</p>
                </TextContainer>
              </Stack.Item>
              <Stack.Item>
                <div style={{ padding: "0 20px" }}>
                  <Image
                    source={trophyImage}
                    alt="Thanks for installing!"
                    width={120}
                  />
                </div>
              </Stack.Item>
            </Stack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card sectioned>
            <Heading element="h1">Available Shortcodes</Heading>
            <br />
            <TextContainer>
              <p>We currently support {SHORTCODES.length} Shortcodes:</p>
            </TextContainer>

            <ResourceList
              resourceName={{singular: 'Shortcode', plural: 'Shortcodes'}}
              items={SHORTCODES}
              renderItem={(item) => {
                const {id, name, initials, parameters, example } = item;
                const media = <Avatar size="medium" name={name} initials={initials} />;

                return (
                  <ResourceItem
                    key={id}
                    id={id}
                    media={media}
                    accessibilityLabel={`View details for ${name}`}
                  >
                    <h3>
                      <TextStyle variation="strong">{name}</TextStyle>
                    </h3>
                    <p>Parameters: {parameters}</p>
                    <p>Usage: <strong>{example}</strong></p>
                  </ResourceItem>
                );
              }}
            />
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card 
            sectioned
            primaryFooterAction={{
              content: "Contact Support",
              url: 'https://electriceye.io/page/contact/'
            }}
          >
            <Stack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <Stack.Item>
                <div style={{ padding: "0 40px 0 0" }}>
                  <Image
                    source={ElectricEyeLogo}
                    alt="Electric Eye"
                    width={120}
                  />
                </div>
              </Stack.Item>
              <Stack.Item fill>
                <TextContainer spacing="loose">
                  <Heading>Like what you see, but want more?</Heading>
                  <Badge progress="partiallyComplete" status="attention">
                    We are currently in beta
                  </Badge>
                  <p>This app is developed by Electric Eye, a boutique agency focused on helping brands grow their online sales.</p>
                  <p>Apps are new to us, and we would love to hear your feedback! If you see areas for improvement, feature requests, or want to work with us, reach out below!</p>
                </TextContainer>
              </Stack.Item>
            </Stack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
