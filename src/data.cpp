#include <cstdint>

constexpr std::uint32_t lCount = 6763;

std::uint32_t countTable[lCount][lCount] = {
    #include "occurrence.txt"
};
