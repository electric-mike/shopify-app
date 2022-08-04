import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { trophyImage } from "../assets";
import { ProductsCard, ShortcodesCard } from "../components";

export default function HomePage() {
  const navigate = useNavigate();

  const viewOnboarding = () => {
    navigate('/extension-onboarding');
  }

  return (
    <Page narrowWidth>
      <TitleBar title="Welcome" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <Card 
            sectioned
            primaryFooterAction={{
              content: "Read Onboarding Guide",
              onAction: viewOnboarding
            }}
          >
            <Stack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <Stack.Item fill>
                <TextContainer spacing="loose">
                  <Heading>Thanks for installing our app! 🎉</Heading>
                  <p>Now that you've installed the app, you now have access to our shortcodes, and can use them to replace existing OS2 blocks.</p>
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
        {/* <Layout.Section>
          <ProductsCard />
        </Layout.Section> */}
        {/* <Layout.Section>
          <ShortcodesCard />
        </Layout.Section> */}
      </Layout>
    </Page>
  );
}
