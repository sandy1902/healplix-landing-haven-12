interface SectionTitleProps {
  title: string;
}

export const SectionTitle = ({ title }: SectionTitleProps) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
      <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        {title}
      </span>
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary rounded-full"></div>
    </h2>
  </div>
);