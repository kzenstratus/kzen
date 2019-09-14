---
title: "Bessel's Correction"
date: 2019-06-30
draft: false
---

Why do we use n-1 when calculating the sample variance?

$$ s^2 = \frac{\sum_{i=1}^{n}(x_i - \overline{x})^2} {n-1}$$

## Problem: Bias in Variance
When we calculate the sample variance, we are trying to get an unbiased estimator for the population vairance. Why is the sample variance considered biased? Because we are comparing data points `x` to the mean of a potentially different set of data points. While the mean of your sample is supposed to represent the mean of your population mean, it may not. 


To see how this affects the variance calculation, lets forget any notion of sample and population first and see what happens when you calculate variance using the a number that may be different from 
$$\bar{x}$$

<html>
 
<link rel= "stylesheet" type= "text/css" href= "/kzen/css/concept.css">


<script src="/kzen/js/d3.min.js"></script>
<script src="/kzen/js/math.min.js"></script>
<script src="/kzen/js/plot_utils.js"></script>
<script src="/kzen/js/plot_class.js"></script>
<script src="/kzen/js/display_class.js"></script>
<script src="/kzen/js/concepts/lin_alg/lin_alg_utils.js"></script>
<script src="/kzen/js/concepts/lin_alg/lin_alg_vars.js"></script>


<body>

  <div class = 'concept-container' id = "linear-combination">


<script type="text/javascript">
  var linCombo = new DisplayConceptExamplePlot({conceptId : linComboPayload.conceptId
          , conceptExampleId : 'lin-combo-example'
          , buttonId : linComboPayload.buttonId
          , xDomain : linAlgGlobalVar.plotDomain
          , yDomain : linAlgGlobalVar.plotDomain
          , height : linAlgGlobalVar.plotHeight
          , width : linAlgGlobalVar.plotWidth
          , numTicks : linAlgGlobalVar.numTicks
          , vecCoordJson: linComboPayload.vecCoordJson
          , duration: linComboPayload.duration
        })
  var linCombo2 = new DisplayConceptExamplePlot({conceptId : linComboPayload.conceptId
          , conceptExampleId : 'lin-combo-example2'
          , buttonId : linComboPayload.buttonId
          , xDomain : linAlgGlobalVar.plotDomain
          , yDomain : linAlgGlobalVar.plotDomain
          , height : linAlgGlobalVar.plotHeight
          , width : linAlgGlobalVar.plotWidth
          , numTicks : linAlgGlobalVar.numTicks
          , vecCoordJson: linComboPayload.vecCoordJson
          , duration: linComboPayload.duration
        })
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



