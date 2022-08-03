import { useState, useCallback } from "react";
import { Card, Page, Layout, TextField, TextContainer, Heading, Button } from "@shopify/polaris";
import { EditMinor } from '@shopify/polaris-icons';
import { Toast, TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { useLocation } from 'react-router-dom';
import { useAppQuery, useAuthenticatedFetch } from "../../hooks";

export default function EditShortcode() {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const [currentShortcode, setCurrentShortcode] = useState({ key: '', value: '' })
  const fetch = useAuthenticatedFetch();
  const navigate = useNavigate();
  const location = useLocation();

  const currentRoute = location.search.replace('?key=', '')

  const {
    data,
    refetch: refetchShortcodeCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: "/api/shortcode/get",
    fetchInit: {
      headers: {
        asset: currentRoute
      }
    },
    reactQueryOptions: {
      onSuccess: (res) => {
        setCurrentShortcode(res.data[0])
        setIsLoading(false);
      },
    },
  });

  const updateShortcode = async () => {
    const response = await fetch("/api/shortcode/update", {
      headers: {
        asset: currentShortcode.key,
        value: JSON.stringify(currentShortcode.value)
      }
    })

    if (response.ok) {
      setToastProps({ content: "Shortcode updated!" });
    } else {
      setIsLoading(false);
      setToastProps({
        content: "There was an error updating them shortcode",
        error: true,
      });
    }
  }

  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  return (
    <>
      {toastMarkup}
      <Page>
        <TitleBar
          title="Edit Shortcode"
          primaryAction={{
            content: "Save Shortcode",
            onAction: () => updateShortcode(),
          }}
          secondaryActions={[
            {
              content: "Back To Shortcodes",
              onAction: () => navigate('/shortcodes'),
            },
          ]}
        />
          {!isLoading && currentShortcode.value != '' ? (
            <TextField
              label={`Edit ${currentShortcode.key}`}
              value={currentShortcode.value}
              onChange={(e) => { setCurrentShortcode({ key: currentShortcode.key, value: e.toString() }) }}
              multiline={4}
              autoComplete="off"
            />
          ) : (
            <p>Loading...</p>
          )}
      </Page>
    </>
  );
}
