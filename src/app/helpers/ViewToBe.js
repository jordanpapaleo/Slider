/*
 * Building a small compact view class
 * NOT DONE AT ALL :)
 */

export class View {
    constructor(node, model) {
        this.node = node;
        this.model = model || {};

        this.dispatch = this.node.getDispatch();
        this.align = new components.Align(this.dispatch);
        this.mountPoint = new components.MountPoint(this.dispatch);
        this.opacity = new components.Opacity(this.dispatch);
        this.origin = new components.Origin(this.dispatch);
        this.position = new components.Position(this.dispatch);
        this.rotation = new components.Rotation(this.dispatch);
        this.scale = new components.Scale(this.dispatch);
        this.size = new components.Size(this.dispatch);
        this.el = new domRenderables.HTMLElement(this.dispatch, 'div');
    }
}
