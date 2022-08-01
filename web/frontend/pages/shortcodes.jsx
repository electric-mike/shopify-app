import { useState, setState, useCallback } from "react";
import { Card, Page, Layout, TextContainer, Heading, Button } from "@shopify/polaris";
import { EditMinor } from '@shopify/polaris-icons';
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

const DEFAULT_SHORTCODE_FILES = [
  'snippets/shortcode.liquid',
  'snippets/shortcode-render.liquid'
]

export default function Shortcodes() {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();
  const navigate = useNavigate();
  
  const {
    data,
    refetch: refetchShortcodeCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: "/api/shortcodes/get",
    reactQueryOptions: {
      onSuccess: (res) => {
        setIsLoading(false);
      },
    },
  });

  const shortcodes = () => {
    return data && data.data || false
  }

  const isDefaultShortcode = (codeKey) => {
    return DEFAULT_SHORTCODE_FILES.includes(codeKey)
  }

  const editShortcode = (code) => {
    navigate(`/edit-shortcode/${code.checksum}?key=${code.key}`)
  }

  return (
    <Page>
      <TitleBar
        title="Shortcodes"
        // primaryAction={{
        //   content: "Primary action",
        //   onAction: () => console.log("Primary action"),
        // }}
        secondaryActions={[
          {
            content: "Back Home",
            onAction: () => navigate('/'),
          },
        ]}
      />
        {shortcodes().length > 0 ? (
          <Layout>
            <Layout.Section>
              {shortcodes().map((code, index) => (
                <Card sectioned key={index}>
                  <Heading>{code.key}</Heading>
                  <TextContainer>
                    <p>{code.created}</p>
                  </TextContainer>
                  <br />
                  {isDefaultShortcode(code.key) ? (
                    <p>This is a required section; cannot modify</p>
                  ) : (
                    <Button icon={EditMinor} onClick={() => editShortcode(code)}>Edit Shortcode</Button>
                  )}
                </Card>
              ))}
            </Layout.Section>
            <Layout.Section secondary>
              <Card sectioned>
                Total Shortcodes: {shortcodes().length}
              </Card>
            </Layout.Section>
          </Layout>
        ) : (
          <Layout>
            <Layout.Section>
              <Card sectioned>
                {isLoadingCount ? (<p>Loading</p>) : (<p>No shortcodes found; please install them!</p>)}
              </Card>
            </Layout.Section>
          </Layout>
        )}
    </Page>
  );
}
