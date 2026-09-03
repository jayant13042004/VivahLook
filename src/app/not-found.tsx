import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Page not found",
  description: "The page you requested could not be found.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="text-sm font-medium text-primary">404</p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
        The page you are looking for does not exist or may have moved.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/">Go home</Button>
        <Button href="/contact" variant="secondary">
          Contact
        </Button>
      </div>
    </Container>
  );
}
