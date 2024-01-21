import { Euler, Matrix4, Quaternion, Vector3 } from "three";

export const rotateAboutAnchor = (
  initPosition: Vector3,
  initRotation: Vector3,
  anchor: Vector3,
  rotation: number
) => {
  let anchorShiftMatrix = new Matrix4().setPosition(anchor);
  anchor.negate();
  let negatedAnchorShiftMatrix = new Matrix4().setPosition(anchor);
  let rotateMatrix = new Matrix4().makeRotationZ(rotation);
  let initPositionMatrix = new Matrix4().setPosition(initPosition);

  anchorShiftMatrix
    .multiply(rotateMatrix)
    .multiply(negatedAnchorShiftMatrix)
    .multiply(initPositionMatrix);

  const newPos = new Vector3();
  const newRotQuat = new Quaternion();

  anchorShiftMatrix.decompose(newPos, newRotQuat, new Vector3());

  const newRot = new Euler();
  newRot.setFromQuaternion(newRotQuat);
  return { newPos, newRot };
};
