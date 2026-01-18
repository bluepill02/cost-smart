export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="prose prose-slate lg:prose-lg max-w-none">
        {children}
      </div>
    </div>
  )
}
