import { useToast } from "@/presentation/shared/components/shadcn-components/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/presentation/shared/components/shadcn-components/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider >
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast className="fixed w-auto top-4 left-4 data-[state=open]:animate-openToast data-[state=closed]:animate-closeToast"  key={id} {...props} duration={3000}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose/>
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
