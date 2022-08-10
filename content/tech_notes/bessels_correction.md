---
title: "Why Use N-1 : Bessel's Correction"
date: 2019-06-30
draft: false
---

Why do we use n-1 when calculating the sample variance?

$$ s^2 = \frac{\sum_{i=1}^{n}(x_i - \overline{x})^2} {n-1}$$

Remember variance is the difference from each point to the center of the distribution over the total number of points.
$$ \delta^2 = \frac{\sum_{i=1}^{n}(x_i - \overline{x})^2} {n}$$

## Problem: Bias in Variance
* The sample variance is supposed to be an unbiased estimator for the population variance.

**Why is the sample variance considered biased?**

* When we calculate sample variance, we are comparing our sample data points, \$x_i\$ to the sample mean. 

* However, the sample mean sample mean may be different from the population mean.


To see how this affects the variance calculation, lets forget any notion of sample and population first, and see what happens when you calculate variance using a number that may be different from 
\$\bar{x}\$.

Lets take two data points, -2, and 2, which has a mean of 0, and see what happens if we insert a few averages that are different from 0, such as 1,2 and 3.
$$ x = \begin{bmatrix}
    -2&2\\
    \end{bmatrix}, \bar{x} = 0$$



$$ \delta_{true}^2 = \frac{(-2 - 0)^2 + (2-0)^2} {2} -  = \frac{4 + 4}{2} = 4 $$
$$ \delta_{other}^2 - \delta_{true}^2 = \frac{(-2 - 1)^2 + (2 - 1)^2} {2} - \delta_{true}^2 = \frac{9 + 1}{2} - \delta_{true}^2 = 5 - 4 = 1 $$
$$ \delta_{other}^2 - \delta_{true}^2 = \frac{(-2 - 2)^2 + (2 - 2)^2} {2} - \delta_{true}^2 = \frac{16 + 0}{2} - \delta_{true}^2= 8 - 4 = 4$$
$$ \delta_{other}^2 - \delta_{true}^2 = \frac{(-2 - 3)^2 + (2 - 3)^2} {2} - \delta_{true}^2 = \frac{25 + 1}{2} - \delta_{true}^2= 13 - 4 = 9$$


<html>
 
<link rel= "stylesheet" type= "text/css" href= "/kzen/css/concept.css">


<!-- <script src="/kzen/js/d3.min.js"></script> -->
<script src="https://d3js.org/d3.v5.min.js"></script>
<script src="/kzen/js/math.min.js"></script>
<script src="/kzen/js/plot_utils.js"></script>
<script src="/kzen/js/plot_class.js"></script>
<script src="/kzen/js/display_class.js"></script>
<script src="/kzen/js/concepts/lin_alg/lin_alg_utils.js"></script>
<script src="/kzen/js/concepts/lin_alg/lin_alg_vars.js"></script>
<script src="/kzen/js/concepts/bessel/bessel_vars.js"></script>
<script src="/kzen/js/concepts/bessel/bessel_bias_display.js"></script>


<body>

  <div class = 'concept-container' id = "bessel-bias">


<script type="text/javascript">
  let testDisplay = new DisplayBesselBias({conceptId : "bessel-bias"
    , height : besselBiasPayload.plotHeight
    , width : besselBiasPayload.plotWidth
    , buttonId : "besselButton"
    });

    


  
  testDisplay.makeFirstPlot({captionCoordJson: besselBiasVarPayload.captionCoordJson
                            ,vecCoordJson : vecCoordJsonBesselBias});
  testDisplay.makeSecondPlot({conceptExampleId : "blahblah2"
                                    , space: besselBiasVarPayload.space});
  testDisplay.makeButton();        
</script>

</div>
</body>
</html>



Bessel's Correction - 
show 2d plot of points

Show why bias occurs.

For a given 2d set of points, draw the mean. 
Then plot the equivalent variance function.
x axis is the actual mean - other mean.
y axis is the the variance.

Take aways:
* Show that this is a parabola with the minimum occuring when the actual mean equals any other mean.
* Anytime the the mean is different than the actual mean, show that the variance increases... This means the the variance will always be larger than it actually should be.
* Show that we can help alleviate this with an approximation to correct this via n-1.

Why n-1?

The key lies in understanding 
Bienaymé formula

Var(mean x) = sigma ^2 / n

A couple of concepts to introduce to understand the above.

* Independence and Var(sum(x)) = sum(Var(x))

If 2 random variables are not correlated, then the sum of the two variables doesn't have a consistent "rule".
If x has a slope of +1 , and y has a +1 slope across time.

Then there is a positive correlation. We see that adding them together over time just results in a 2x shift upward (1 ->2, 2-> 4, 3 -> 6). This essentially increases the spread of the points, and the variance increases.

However, if there is a negative correlation, then adding up the points over time cancels them out!  and the variance essentially becomes 0.

Thus in order for us to establish that the 
Var(sum(x)) = sum(Var(x))

we need to invoke independence in order for that to happen.

But what does it mean for independence to occur?
It maintains the property that E[XY] = E[X]E[Y]
What does it mean to multiple 2 random variables?

Is this convolution?
multiplying 2 functions to get another function?

