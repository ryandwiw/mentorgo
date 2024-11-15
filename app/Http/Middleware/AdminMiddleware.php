<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        \Log::info("Middleware Admin dipanggil"); // Tambahkan log ini

        if (auth()->guard('admin')->check()) {
            \Log::info("Admin terautentikasi"); // Tambahkan log ini
            return $next($request);
        }

        \Log::info("Admin tidak terautentikasi"); // Tambahkan log ini
        return redirect()->route('admin.login');
    }
}
