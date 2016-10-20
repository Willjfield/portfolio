/*var fragment_Shader = `
	//#extension GL_OES_standard_derivatives : enable

	varying vec3 ec_pos;

	float rand(vec2 co){
    	return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
	}

	void main(void)
	{
	// face normal in eyespace:
		vec3 ec_normal = normalize(cross(dFdx(ec_pos), dFdy(ec_pos)));
		float bR = (ec_normal.r+1.7)/2.;
		float bB = (ec_normal.b+1.7)/2.;
		float bG = (ec_normal.g+1.7)/2.;
		gl_FragColor = vec4(bR,bB,bG,1.);
	}
	`;*/

var fragment_Shader = `
	varying vec3 ec_pos;

	precision mediump float;
	//varying vec4 v_color;
	void main() {
		vec3 ec_normal = normalize(cross(dFdx(ec_pos), dFdy(ec_pos)));
		float bR = (ec_normal.r+1.7)/2.;
		float bB = (ec_normal.b+1.7)/2.;
		float bG = (ec_normal.g+1.7)/2.;
		gl_FragColor = vec4(1.,1.,1.,1.);
	}

	`;