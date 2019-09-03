---
title: "Bessel's Correction"
date: 2019-06-30
draft: true
---

Regression - lets see if we can fit some line or curve to a set of points. 

Linear Regression use - 
* Prediction, forecasting, or error reduction.
* Explain variation in the response variable as due to variation in the explanatory variable. 

Linear Regression Assumptions:
* Data must be linear with respect to the output or independent variable.
* Features/Variables can't be linear with respect to each other. ie. One feature predicts the other. (aka. multicollinearity or collinearity). This doesn't make the model worse per-say, however it does prevent remove the interpretability of the features.
* Constant Variance (homoscedasticity). Think of fitting a line to a cone shaped set of points, will give bad results.
* As with non-linear features, the features need to be independent of each other.


OLS - Ordinary Least Squares = The function is optimized by minimizing the least squares error

GLM - The output y is no longer scalar, its a vector. Lets the error distribution be non-normal. 