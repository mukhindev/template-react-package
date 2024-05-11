import { ForwardedRef, HTMLAttributes, forwardRef } from "react";
import styles from "./Space.module.css";

export interface SpaceProps extends HTMLAttributes<HTMLDivElement> {
  "data-component"?: string;
}

/** Space */
export default forwardRef(function Space(
  props: SpaceProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const {
    "data-component": dataComponent,
    children,
    className,
    ...divProps
  } = props;

  return (
    <div
      data-component={dataComponent ? `Space/${dataComponent}` : "Space"}
      className={[styles.root, className].filter((el) => el).join(" ")}
      ref={ref}
      {...divProps}
    >
      {children}
    </div>
  );
});
