from manim import *


class Bessel(Scene):
    def construct(self):
        # defines the axes and linear function
        axes = Axes(x_range=[-3, 3], y_range=[0, 9], x_length=7, y_length=6)
        func = axes.plot(lambda x: x ** 2, color=BLUE)

        ax = axes.add_coordinates()
        point = ax.coords_to_point(-2, 2)
        dot = Dot(point)
        line = ax.get_vertical_line(point, line_config={"dashed_ratio": 0.85})

        # creates the T_label
        # t_label = axes.get_T_label(x_val=4, graph=func, label=Tex("x-value"))
        self.add(axes, func, dot, line)
