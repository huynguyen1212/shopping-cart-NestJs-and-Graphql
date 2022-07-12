import { Resolver, Query } from '@nestjs/graphql';

@Resolver('User')
export class UserResolver {
  @Query((returns) => String) // Bắt buộc phải có @Query và có kiểu trả về bên trong nếu muốn generate
  // Tên query bên phía schema sẽ dựa theo tên function
  // Nestjs sử dụng typescript nên bạn sử dụng Promise<string> để bắt buộc kiểu trả về, nếu trả về kiểu INT sẽ báo lỗi
  async user(): Promise<string> {
    return 'Hello world!';
  }
}
