<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class MentorMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        \Log::info("Middleware mentor dipanggil"); // Tambahkan log ini

        if (auth()->guard('mentor')->check()) {
            \Log::info("Mentor terautentikasi"); // Tambahkan log ini
            return $next($request);
        }

        \Log::info("Mentor tidak terautentikasi"); // Tambahkan log ini
        return redirect()->route('mentor.login');
    }


}
