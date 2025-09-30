import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="mt-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="flex space-x-4">
            <a
              href="https://github.com/DanielaS-Tochi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              aria-label="GitHub Profile"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://twitter.com/DanielaS_Tochi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              aria-label="Twitter Profile"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://linkedin.com/in/daniela-silvana-tochi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
          <div className="flex items-center">
            <iframe
              src="https://github.com/sponsors/DanielaS-Tochi/button"
              title="Sponsor DanielaS-Tochi"
              height="32"
              width="114"
              style={{ border: 0, borderRadius: '6px' }}
            />
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          © 2025 Daniela Silvana Tochi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}