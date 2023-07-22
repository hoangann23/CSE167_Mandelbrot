#version 330 core

// Inputs to the fragment shader are outputs
// of the same name of the vertex shader
in vec2 canvas_coord; // range [-1,1]x[-1,1]

uniform vec2 center;
uniform float zoom;
uniform int maxiter;

// Output the frag color
out vec4 fragColor;

// HW1: You can define customized functions here,
// e.g. complex multiplications, helper functions
// for colormap etc.

vec2 cprod(const vec2 z1, const vec2 z2) {
    vec2 prod = vec2((z1[0]*z2[0]) - (z1[1]*z2[1]), (z1[0]*z2[1]) + (z1[1]*z2[0]));
    return prod;
}

void main (void){
    
    vec2 c = center + zoom * canvas_coord;
    // HW1: Your implementation goes here. Compute
    // the value of the Mandelbrot fractal at
    // complex number c.  Then map the value to
    // some color.
    vec2 z = vec2(0.0f, 0.0f);

    int i = 0;
    for (int k = 0; k < maxiter; k++) {
        z = cprod(z, z) + c;
        float norm = sqrt(pow(z[0], 2) + pow(z[1], 2));
        if (norm > 2) {
            i = k;
            break;
        }
    }
    // HW1: Replace the following default color
    float iter = float(i);
    float miter = float(maxiter);
    float color = (iter == 0.0) ? 0.0 : iter/miter;
    vec3 rgb = (iter == 0.0) ? vec3(color, color, color) : vec3(color/4.0, color, color);
    fragColor = vec4(rgb, 1.0f);
}
