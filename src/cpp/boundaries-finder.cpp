#include <emscripten/bind.h>
#include <cstddef>
#include <cstdlib>


uint8_t *buffer = nullptr;
size_t bufferSize = 0;

uint8_t processTheImage(uint8_t picture[], uint8_t length)
{
  uint8_t sum = 0;
  for(uint8_t i = 0; i<length; ++i){
    sum +=picture[i];
  }
  return sum;
}