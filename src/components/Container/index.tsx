import { ContainerProps } from './type';

export function Container({ children }: ContainerProps) {
  return (
    <>
      <div className="p-4 items-center justify-center gap-4 grid grid-cols-12 max-w-7xl m-auto">{children}</div>
    </>
  );
}
