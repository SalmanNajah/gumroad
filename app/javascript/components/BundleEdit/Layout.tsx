import * as React from "react";
import { Link, useMatches, useNavigate } from "react-router-dom";

import { saveBundle } from "$app/data/bundle";
import { setProductPublished } from "$app/data/publish_product";
import { getContrastColor } from "$app/utils/color";
import { asyncVoid } from "$app/utils/promise";
import { assertResponseError } from "$app/utils/request";

import { useBundleEditContext } from "$app/components/BundleEdit/state";
import { Button } from "$app/components/Button";
import { CopyToClipboard } from "$app/components/CopyToClipboard";
import { useCurrentSeller } from "$app/components/CurrentSeller";
import { useDomains } from "$app/components/DomainSettings";
import { Icon } from "$app/components/Icons";
import { Preview } from "$app/components/Preview";
import { PreviewSidebar, WithPreviewSidebar } from "$app/components/PreviewSidebar";
import { showAlert } from "$app/components/server-components/Alert";
import { PageHeader } from "$app/components/ui/PageHeader";
import { Tabs, Tab } from "$app/components/ui/Tabs";
import { useIsAboveBreakpoint } from "$app/components/useIsAboveBreakpoint";
import { WithTooltip } from "$app/components/WithTooltip";

const hexToRgb = (hex: string) =>
  `${parseInt(hex.slice(1, 3), 16)} ${parseInt(hex.slice(3, 5), 16)} ${parseInt(hex.slice(5), 16)}`;

export const useProductUrl = (params = {}) => {
  const { bundle, uniquePermalink } = useBundleEditContext();
  const currentSeller = useCurrentSeller();
  const { appDomain } = useDomains();
  return Routes.short_link_url(bundle.custom_permalink ?? uniquePermalink, {
    host: currentSeller?.subdomain ?? appDomain,
    ...params,
  });
};

export const Layout = ({
  children,
  preview,
  isLoading = false,
}: {
  children: React.ReactNode;
  preview: React.ReactNode;
  isLoading?: boolean;
}) => {
  const { bundle, updateBundle, id, uniquePermalink } = useBundleEditContext();
  const currentSeller = useCurrentSeller();

  const url = useProductUrl();

  const [match] = useMatches();
  const tab = match?.handle ?? "product";

  const isDesktop = useIsAboveBreakpoint("lg");

  const [isSaving, setIsSaving] = React.useState(false);
  const handleSave = async () => {
    try {
      setIsSaving(true);
      await saveBundle(id, bundle);
      showAlert("Changes saved!", "success");
    } catch (e) {
      assertResponseError(e);
      showAlert(e.message, "error");
    }
    setIsSaving(false);
  };

  const [isPublishing, setIsPublishing] = React.useState(false);
  const setPublished = async (published: boolean) => {
    try {
      setIsPublishing(true);
      await saveBundle(id, bundle);
      await setProductPublished(uniquePermalink, published);
      updateBundle({ is_published: published });
      showAlert(published ? "Published!" : "Unpublished!", "success");
      if (tab === "share") navigate(`/bundles/${id}/content`);
      else if (published) navigate(`/bundles/${id}/share`);
    } catch (e) {
      assertResponseError(e);
      showAlert(e.message, "error");
    }
    setIsPublishing(false);
  };

  const isUploadingFiles = bundle.public_files.some(
    (f) => f.status?.type === "unsaved" && f.status.uploadStatus.type === "uploading",
  );
  const isUploadingFilesOrImages = isLoading || isUploadingFiles;
  const isBusy = isUploadingFilesOrImages || isSaving || isPublishing;
  const saveButtonTooltip = isUploadingFiles
    ? "Files are still uploading..."
    : isUploadingFilesOrImages
      ? "Images are still uploading..."
      : isBusy
        ? "Please wait..."
        : undefined;

  const navigate = useNavigate();

  const profileColors = currentSeller
    ? {
        "--accent": hexToRgb(currentSeller.profileHighlightColor),
        "--contrast-accent": hexToRgb(getContrastColor(currentSeller.profileHighlightColor)),
        "--filled": hexToRgb(currentSeller.profileBackgroundColor),
        "--color": hexToRgb(getContrastColor(currentSeller.profileBackgroundColor)),
      }
    : {};

  const fontUrl =
    currentSeller?.profileFont && currentSeller.profileFont !== "ABC Favorit"
      ? `https://fonts.googleapis.com/css2?family=${currentSeller.profileFont}:wght@400;600&display=swap`
      : null;

  const saveButton = (
    <WithTooltip tip={saveButtonTooltip}>
      <Button color="primary" disabled={isBusy} onClick={asyncVoid(handleSave)}>
        {isSaving ? "Saving changes..." : "Save changes"}
      </Button>
    </WithTooltip>
  );

  const onTabClick = (e: React.MouseEvent<HTMLAnchorElement>, callback?: () => void) => {
    const message = isUploadingFiles
      ? "Some files are still uploading, please wait..."
      : isUploadingFilesOrImages
        ? "Some images are still uploading, please wait..."
        : undefined;

    if (message) {
      e.preventDefault();
      showAlert(message, "warning");
      return;
    }

    callback?.();
  };

  return (
    <>
      <PageHeader
        className="sticky-top"
        title={bundle.name || "Untitled"}
        actions={
          bundle.is_published ? (
            <>
              <Button disabled={isBusy} onClick={() => void setPublished(false)}>
                {isPublishing ? "Unpublishing..." : "Unpublish"}
              </Button>
              {saveButton}
              <CopyToClipboard
                text={url}
                copyTooltip="Copy product URL"
                tooltipPosition={isDesktop ? "left" : "bottom"}
              >
                <Button>
                  <Icon name="link" />
                </Button>
              </CopyToClipboard>
            </>
          ) : tab === "product" ? (
            <Button
              color="primary"
              disabled={isBusy}
              onClick={() => void handleSave().then(() => navigate(`/bundles/${id}/content`))}
            >
              {isSaving ? "Saving changes..." : "Save and continue"}
            </Button>
          ) : (
            <>
              {saveButton}
              <WithTooltip tip={saveButtonTooltip}>
                <Button color="accent" disabled={isBusy} onClick={() => void setPublished(true)}>
                  {isPublishing ? "Publishing..." : "Publish and continue"}
                </Button>
              </WithTooltip>
            </>
          )
        }
      >
        <Tabs style={{ gridColumn: 1 }}>
          <Tab asChild isSelected={tab === "product"}>
            <Link to={`/bundles/${id}`} onClick={onTabClick}>
              Product
            </Link>
          </Tab>
          <Tab asChild isSelected={tab === "content"}>
            <Link to={`/bundles/${id}/content`} onClick={onTabClick}>
              Content
            </Link>
          </Tab>
          <Tab asChild isSelected={tab === "share"}>
            <Link
              to={`/bundles/${id}/share`}
              onClick={(evt: React.MouseEvent<HTMLAnchorElement>) => {
                onTabClick(evt, () => {
                  if (!bundle.is_published) {
                    evt.preventDefault();
                    showAlert(
                      "Not yet! You've got to publish your awesome product before you can share it with your audience and the world.",
                      "warning",
                    );
                  }
                });
              }}
            >
              Share
            </Link>
          </Tab>
        </Tabs>
      </PageHeader>
      {preview ? (
        <WithPreviewSidebar className="flex-1">
          {children}
          <PreviewSidebar
            previewLink={(props) => (
              <Button {...props} onClick={() => void handleSave().then(() => window.open(url))} disabled={isBusy} />
            )}
          >
            <Preview
              scaleFactor={0.4}
              style={{
                border: "var(--border)",
                borderRadius: "var(--border-radius-2)",
                fontFamily: currentSeller?.profileFont === "ABC Favorit" ? undefined : currentSeller?.profileFont,
                ...profileColors,
                "--primary": "var(--color)",
                "--body-bg": "rgb(var(--filled))",
                "--contrast-primary": "var(--filled)",
                "--contrast-filled": "var(--color)",
                "--color-body": "var(--body-bg)",
                "--color-background": "rgb(var(--filled))",
                "--color-foreground": "rgb(var(--color))",
                "--color-border": "rgb(var(--color) / var(--border-alpha))",
                "--color-accent": "rgb(var(--accent))",
                "--color-accent-foreground": "rgb(var(--contrast-accent))",
                "--color-primary": "rgb(var(--primary))",
                "--color-primary-foreground": "rgb(var(--contrast-primary))",
                "--color-active-bg": "rgb(var(--color) / var(--gray-1))",
                "--color-muted": "rgb(var(--color) / var(--gray-3))",
                backgroundColor: "rgb(var(--filled))",
                color: "rgb(var(--color))",
              }}
            >
              {fontUrl ? (
                <>
                  <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                  <link rel="stylesheet" href={fontUrl} />
                </>
              ) : null}
              {preview}
            </Preview>
          </PreviewSidebar>
        </WithPreviewSidebar>
      ) : (
        <div className="flex-1">{children}</div>
      )}
    </>
  );
};
