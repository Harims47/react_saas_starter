import React from "react";
import AppCard from "../../components/common/AppCard";
import AppButton from "../../components/common/AppButton";

export const CreatePageTemplate = ({
  title,
  subtitle,
  onSave,
  onCancel,
  saveButtonText = "Save",
  cancelButtonText = "Cancel",
  loading = false,
  children,
}) => {
  return (
    <div className="container-fluid py-2" style={{ maxWidth: "800px" }}>
      <div className="mb-4">
        <h2 className="h4 fw-bold mb-1 text-body">{title}</h2>
        {subtitle && <p className="text-muted small mb-0">{subtitle}</p>}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onSave(); }}>
        <AppCard
          footerContent={
            <div className="d-flex justify-content-end gap-2">
              {onCancel && (
                <AppButton variant="light" onClick={onCancel} disabled={loading}>
                  {cancelButtonText}
                </AppButton>
              )}
              <AppButton type="submit" variant="primary" loading={loading} icon="bi-check-lg">
                {saveButtonText}
              </AppButton>
            </div>
          }
        >
          {children}
        </AppCard>
      </form>
    </div>
  );
};

export default CreatePageTemplate;
