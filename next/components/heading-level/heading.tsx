import Boundary from "./boundary";
import H from "./h";

/*
type Props = {
  levelOverride?: string | number;
};
*/

/**
 * Dynamic heading component.
 * An automatic heading management compound component. Keeps
 * track of the heading levels in the application and renders
 * the correct <h> tag.
 *
 * By default the first level that will be rendered will be
 * <h2> but this can be overridden by setting the
 * levelOverride prop
 *
 * @prop {string | number} levelOverride: Optional override
 * prop to hard set the current level.
 *
 * @example
 * <h1>Heading 1</h1>
 * <Heading.Boundary>
 *     <Heading.H>Heading 2</Heading.H>
 *     <Heading.Boundary>
 *          <Heading.H>Heading 3</Heading.H>
 *     </Heading.Boundary>
 *     <Heading.Boundary>
 *          <Heading.H>Heading 3</Heading.H>
 *          <Heading.Boundary>
 *              <Heading.H>Heading 4</Heading.H>
 *          </Heading.Boundary>
 *     </Heading.Boundary>
 * </Heading.Boundary>
 */
const Heading = {
  Boundary,
  H,
};

export default Heading;
