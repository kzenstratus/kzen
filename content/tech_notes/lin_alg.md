---
title: "Linear Algebra"
date: 2019-06-30
draft: false
---

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
    <div class = 'concept-text'>
    	<h3>Linear Combination</h3>
    	<p>
        We have 3 vectors 
        <font color = "#68a2ff">a </font>,
        <font color = "#6bcc35">b </font>,
        <font color = "#ff80ff">c </font>.
        If we connect each vector from head to tail, we get the sum of the vectors, <font color = "#cc4634">vector d</font>.
        <br>
        We can stretch and shrink 
        <font color = "#68a2ff">a </font>,
        <font color = "#6bcc35">b </font>,
        and 
        <font color = "#ff80ff">c </font>, to get many different <font color = "#cc4634">vectors</font>.
        If you take all of the possible combinations of stretching and shrinking 
        <font color = "#68a2ff">a </font>,
        <font color = "#6bcc35">b </font>,
        <font color = "#ff80ff">c </font>, all the resulting <font color = "#cc4634">vectors</font> are called the linear combination of a,b and c.
      </p>
  </div>

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
  linCombo.makePlot();
  linCombo.makeVectors();
  linCombo.makeButton();
</script>

</div>
  <div class = 'concept-container' id = "linear-independence">
    <div class = 'concept-text'>
      <h3>Linear Independence</h3>
      <p>
        We have 3 vectors 
        <font color = "#68a2ff">a </font>,
        <font color = "#6bcc35">b </font>,
        <font color = "#ff80ff">c </font>.
        Earlier we saw that the linear combination of these 3 vectors can give us many different vectors. What if we added two of these vectors together, can we get the third vector?
        <br>
        We see that we can describe <font color = "#68a2ff">vector a </font> as a linear combination of vectors <font color = "#6bcc35">b </font> and <font color = "#ff80ff">c </font>. 
        <br>
        In fact <font color = "#6bcc35">b </font> can be described with <font color = "#68a2ff">vector a </font> and <font color = "#ff80ff">c </font>, and likewise for vector <font color = "#ff80ff">c </font>.
        <br>
        [Press GO to see this in action]
        <br><br>
        This means that one of these vectors is redundant and not linearly independent! If we were to remove one of our vectors, we can still describe the same space (by stretching, shrinking, and combining with each other) as we could with 3 vectors. Note, if we have two vectors that lie in the same direction, then those won't be linearlly indepdendent!
      </p>
    </div>

<script type="text/javascript">
      var linIndependence = new DisplayConceptExamplePlot({conceptId : linIndPayload.conceptId
                , conceptExampleId : "lin-ind-example"
                , buttonId : linIndPayload.buttonId
                , xDomain : linAlgGlobalVar.plotDomain
                , yDomain : linAlgGlobalVar.plotDomain
                , height : linAlgGlobalVar.plotHeight
                , width : linAlgGlobalVar.plotWidth
                , numTicks : linAlgGlobalVar.numTicks
                , tarColor : linIndPayload.tarColor
                , tarSpace : linIndPayload.highlightSpace
                , vecCoordJson: linIndPayload.vecCoordJson
                , duration: linIndPayload.duration
              })
      linIndependence.makePlot();
      linIndependence.makeVectors();
      linIndependence.makeButton();
</script>
</div>

  <div class = 'concept-container' id = "basis">
    <div class = 'concept-text'>
      <h3> Basis</h3>
      <p>
        Adding <font color = "#68a2ff">vectors v1 and v2</font> gets us <font color = "#cc4634">vector v3</font>.
        <br><br>
        By stretching and shrinking <font color = "#68a2ff">vectors v1 and v2</font>, the resulting <font color = "#cc4634">vector v3</font> can hit every <font color = "grey">point</font> on this plot. We call all of those <font color = "grey">points</font> our vector space.
        <br>
        [Hit Go! to see this in action]
        <br><br>
        <font color = "#68a2ff">Vectors v1 and v2</font> here are our basis vectors. 
        Basis vectors must be linearly independent. Here we see that there is no way I can get vector v2 by stretching and shrinking v1.
    </p>

</div>
<script type="text/javascript">
          // Read in linAlgGlobalVar and kernelPayload
          var basisOrtho = new DisplayConceptExamplePlot({conceptId : basisPayload.conceptId
                , conceptExampleId : "basis-example-ortho"
                , buttonId : basisPayload.buttonId
                , xDomain : linAlgGlobalVar.plotDomain
                , yDomain : linAlgGlobalVar.plotDomain
                , height : linAlgGlobalVar.plotHeight
                , width : linAlgGlobalVar.plotWidth
                , numTicks : linAlgGlobalVar.numTicks
                , vecCoordJson: basisPayload.vecCoordJson
                , duration: basisPayload.duration
              })
          basisOrtho.makePlot();
          basisOrtho.makeVectors();
          basisOrtho.makeButton();
          
          </script>

  </div>


<div class = 'concept-container' id = "basis_non_ortho">
   <div class = 'concept-text' >
      <h3>Non Orthogonal Basis </h3>
      <p>
        Our vectors don't need to be orthogonal (cross at 90 deg). 
        <font color = "#68a2ff">v1 </font> and 
        <font color = "#68a2ff">v2 </font> can be basis vectors since they are linearly independent.
        Meaning <font color = "#cc4634">v3 </font> can hit all grey points by stretching and shrinking 
        <font color = "#68a2ff">v1 </font> and 
        <font color = "#68a2ff">v2 </font>.
        <br><br>
        Note: We don't have to stretch or shrink our vectors such they land on each grey point. These vectors can stretch and shrink such that they land anywhere!
    </p>
</div>

<script type="text/javascript">
          var basisNonOrtho = new DisplayConceptExamplePlot({conceptId : basisNonOrthoPayload.conceptId
                , conceptExampleId : "basis-example"
                , buttonId : basisNonOrthoPayload.buttonId
                , xDomain : linAlgGlobalVar.plotDomain
                , yDomain : linAlgGlobalVar.plotDomain
                , height : linAlgGlobalVar.plotHeight
                , width : linAlgGlobalVar.plotWidth
                , numTicks : linAlgGlobalVar.numTicks
                , vecCoordJson: basisNonOrthoPayload.vecCoordJson
                , duration: basisNonOrthoPayload.duration
                })
          basisNonOrtho.makePlot();
          basisNonOrtho.makeVectors();
          basisNonOrtho.makeButton();
          
    </script>
  </div>

  <div class = 'concept-container' id = "kernel">
    <div class = 'concept-text'>
      <h3>Kernel</h3>
      <p>
        The Kernel of a linear transformation (red points) is the space that goes to 0 during the  linear transformation. <br>
        When no dimensionality reduction happens eg. 2d to 1d, the only point in the kernel will be 0. 0 is always in the kernel.
      </p>
  </div>

<script type="text/javascript">
          // Read in linAlgGlobalVar and kernelPayload
          var kernel = new DisplayConceptExamplePlot({conceptId : kernelPayload.conceptId
                , conceptExampleId : "kernel-example"
                , buttonId : kernelPayload.buttonId
                , xDomain : linAlgGlobalVar.plotDomain
                , yDomain : linAlgGlobalVar.plotDomain
                , height : linAlgGlobalVar.plotHeight
                , width : linAlgGlobalVar.plotWidth
                , numTicks : linAlgGlobalVar.numTicks
                , tarColor : kernelPayload.tarColor
                , tarSpace : kernelPayload.highlightSpace
                , listNextDotSpaces : kernelPayload.listNextDotSpaces
                })
          kernel.makePlot();
          kernel.makeVectors();
          kernel.makeButton();

</script>
  </div>
  <div class = 'concept-container' id = "image">
    <div class = 'concept-text'>
      <h3>Image</h3>
      <p>
        The Image of a linear transformation (red points) is the space (span) which the linear transformation maps to. 
      </p>
  </div>

<script type="text/javascript">
  var image = new DisplayConceptExamplePlot({conceptId : imagePayload.conceptId
                , conceptExampleId : "image-example"
                , buttonId : imagePayload.buttonId
                , xDomain : linAlgGlobalVar.plotDomain
                , yDomain : linAlgGlobalVar.plotDomain
                , height : linAlgGlobalVar.plotHeight
                , width : linAlgGlobalVar.plotWidth
                , numTicks : linAlgGlobalVar.numTicks
                , tarColor : imagePayload.tarColor
                , tarSpace : imagePayload.highlightSpace
                , listNextDotSpaces : imagePayload.listNextDotSpaces
                })
      image.makePlot();
      image.makeVectors();
      image.makeButton();

</script>

</body>
</html>

