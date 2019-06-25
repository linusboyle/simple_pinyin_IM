#include <cstdint>

constexpr std::uint32_t lCount = 6763;

std::uint32_t occurrence[lCount] = {
    #include "count.txt"
};
