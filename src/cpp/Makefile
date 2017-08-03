
boundaries-finder.js: boundaries-finder.cpp
	em++ --bind --std=c++11 boundaries-finder.cpp -s WASM=1 -s SIDE_MODULE=1 -o ../generated/output.wasm

clean:
	rm *.js *.wasm