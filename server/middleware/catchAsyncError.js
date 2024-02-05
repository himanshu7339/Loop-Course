export const catchAsyncError = (passFunction) => {
  return (req ,res,next) => {
    Promise.resolve(passFunction(req,res,next)).catch(next)
  };
};
